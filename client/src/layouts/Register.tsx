import { useState, useEffect, FC, ChangeEvent, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { route } from '../../backendroute';

// Define roles type
type Role = "Admin" | "Patient" | "Doctor" | "Inventoryman" | "Receptionist";

// Define form data structure for each role
type AdminForm = {
  name: string;
  email: string;
  password: string;
  hospitalName: string;
  hospitalAdminpass: string;
}

type InventorymanForm = {
  name: string;
  email: string;
  password: string;
  hospitalName: string;
  hospitalInventorypass: string;
}

type DoctorForm = {
  name: string;
  email: string;
  password: string;
  specialty?: string;
  hospitalName: string;
  hospitalDocpass: string;
  departmentId: number;
  description?: string;
  workingdays: string[];
}

type PatientForm = {
  name: string;
  email: string;
  password: string;
  age: number;
  bloodtype?: string;
  contact: string;
}

type ReceptionistForm = {
  name: string;
  email: string;
  password: string;
  hospitalName: string;
  hospitalReceptionpass: string;
}

// Define union type for all forms
type FormData = AdminForm | InventorymanForm | DoctorForm | PatientForm | ReceptionistForm;

interface Department {
  id: number;
  name: string;
}

interface Hospital {
  id: number;
  name: string;
  coordinates: number[];
  services: string[];
  departments: Department[];
}

const Register = () => {
  const roles = ["Admin", "Patient", "Doctor", "Inventoryman", "Receptionist"];
  const [role, setRole] = useState<Role | "">('');
  const [hospitalList, setHospitalList] = useState<Hospital[]>([]);
  const [formData, setFormData] = useState<FormData | Partial<FormData>>({});
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [departmentList, setDepartmentList] = useState<Department[]>([]);
  const [isRoleSelected, setIsRoleSelected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isHospitalLoading, setIsHospitalLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch hospital names on component mount
    const fetchHospitals = async () => {
      setIsHospitalLoading(true);
      try {
        const response = await axios.get<Hospital[]>(route + '/hospitals');
        setHospitalList(response.data);
      } catch (error: any) {
        console.error("Error fetching hospitals:", error);
        setError(error.response?.data?.message || "Failed to fetch hospitals. Please try again.");
      } finally {
        setIsHospitalLoading(false);
      }
    };
    fetchHospitals();
  }, []);

  const handleRoleSelection = () => {
    setError(null);
    if (!role) {
      setError("Please select a role to continue");
      return;
    }
    setIsRoleSelected(true);
  };

  const handleBack = () => {
    setIsRoleSelected(false);
    setFormData({});
    setError(null);
    setRole('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    // Clear any previous errors when user makes changes
    setError(null);
    
    const { name, value } = e.target;
    if (name === "confirmPassword")
      setConfirmPassword(value);
    else if (name === "hospitalName") {
      setFormData((prev) => ({
        ...prev,
        hospitalName: value,
      }));
      const hospital = hospitalList.find(h => h.name === value);
      setDepartmentList(hospital?.departments || []);
    }
    else if (name === "workingdays") {
      const days = value.split(", ");
      setFormData((prev) => ({
       ...prev,
        [name]: days
      }));
    }
    else if (name === "age") {
      setFormData((prev) => ({
       ...prev,
        [name]: Number(value)
      }));
    }
    else if (name === "departmentId") 
      setFormData((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
    else setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    // Common validation for all roles
    if (!formData.name) {
      setError("Name is required");
      return false;
    }
    if (!formData.email) {
      setError("Email is required");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    
    // Role-specific validation
    switch (role) {
      case 'Admin':
      case 'Doctor':
      case 'Receptionist':
      case 'Inventoryman':
        if (!('hospitalName' in formData) || !formData.hospitalName) {
          setError("Hospital selection is required");
          return false;
        }
        break;
      case 'Patient':
        if (!('age' in formData) || !formData.age) {
          setError("Age is required");
          return false;
        }
        if (!('contact' in formData) || !formData.contact) {
          setError("Contact information is required");
          return false;
        }
        break;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    const payload = { ...formData, role };
    
    try {
      const response = await axios.post<{ token: string, user: any, message: string }>(route + '/auth/register', payload);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("role", role);
      
      // Show success message
      setSuccess(response.data.message || "Registration successful!");
      
      // Navigate after a short delay to show the success message
      setTimeout(() => {
        navigate(role === "Inventoryman" ? "/inventory-manager" : "/" + role.toLowerCase());
      }, 1500);
    } catch (error: any) {
      console.error("Error during registration:", error);
      if (error.response) {
        setError(error.response.data.message || "Registration failed");
      } else if (error.request) {
        setError("No response from server. Please try again later.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!isRoleSelected) {
        handleRoleSelection();
      } else {
        handleSubmit();
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-700 py-8">
      <motion.div
        className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {isRoleSelected ? (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex items-center mb-6">
              <button 
                onClick={handleBack}
                className="text-gray-600 hover:text-gray-800 transition-colors"
                aria-label="Go back"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-3xl font-bold text-gray-800 ml-4 flex-grow text-center pr-6">
                {role} Registration
              </h1>
            </div>
            <div className="space-y-4">
              <RenderFormFields 
                role={role} 
                hospitalList={hospitalList} 
                handleChange={handleChange} 
                formData={formData} 
                departmentList={departmentList} 
                handleKeyPress={handleKeyPress}
                isHospitalLoading={isHospitalLoading}
              />
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full px-6 py-3 ${isLoading ? 'bg-green-400' : 'bg-green-500 hover:bg-green-600'} text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300`}
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>
              
              {error && (
                <motion.div 
                  className="mt-4 text-red-500 text-center p-2 bg-red-50 rounded-md"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}
              
              {success && (
                <motion.div 
                  className="mt-4 text-green-600 text-center p-2 bg-green-50 rounded-md"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {success}
                </motion.div>
              )}
              
              <div className="mt-4 text-center">
                <p className="text-gray-600">
                  Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Select Your Role
            </h1>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              onKeyPress={handleKeyPress}
              className="mb-4 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Role</option>
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <button
              onClick={handleRoleSelection}
              className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
            >
              Next
            </button>
            
            {error && (
              <motion.div 
                className="mt-4 text-red-500 text-center p-2 bg-red-50 rounded-md"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
              </p>
            </div>
            
            <div className="mt-4 text-center">
              <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">
                Back to Home
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

const RenderFormFields: FC<{ 
  role: Role | "", 
  hospitalList: Hospital[], 
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void, 
  formData: Partial<FormData>, 
  departmentList: Department[],
  handleKeyPress: (e: React.KeyboardEvent) => void,
  isHospitalLoading: boolean
}> = ({ 
  role, 
  hospitalList, 
  handleChange, 
  formData, 
  departmentList,
  handleKeyPress,
  isHospitalLoading
}) => {
  const inputClass = "w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4";
  
  return useMemo(() => {
    // Common fields for all roles
    const commonFields = (
      <>
        <input 
          className={inputClass} 
          type="text" 
          name="name" 
          placeholder="Full Name" 
          value={formData.name || ''} 
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          required
        />
        <input 
          className={inputClass} 
          type="email" 
          name="email" 
          placeholder="Email Address" 
          value={formData.email || ''} 
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          required
        />
        <input 
          className={inputClass} 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password || ''} 
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          required
        />
        <input 
          className={inputClass} 
          type="password" 
          name="confirmPassword" 
          placeholder="Confirm Password" 
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          required
        />
      </>
    );

    // Hospital selection field
    const hospitalField = (
      <select 
        className={inputClass} 
        name="hospitalName" 
        onChange={handleChange}
        disabled={isHospitalLoading}
        required
      >
        <option value="">
          {isHospitalLoading ? "Loading hospitals..." : "Select Hospital"}
        </option>
        {hospitalList.map(h => (
          <option key={h.id} value={h.name}>{h.name}</option>
        ))}
      </select>
    );

    switch (role) {
      case 'Admin':
        return (
          <>
            {commonFields}
            {hospitalField}
            <input 
              className={inputClass} 
              type="password" 
              name="hospitalAdminpass" 
              placeholder="Admin Password" 
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              required
            />
          </>
        );
      case 'Inventoryman':
        return (
          <>
            {commonFields}
            {hospitalField}
            <input 
              className={inputClass} 
              type="password" 
              name="hospitalInventorypass" 
              placeholder="Inventory Manager Password" 
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              required
            />
          </>
        );
      case 'Doctor':
        return (
          <>
            {commonFields}
            {hospitalField}
            <input 
              className={inputClass} 
              type="text" 
              name="specialty" 
              placeholder="Specialty" 
              value={'specialty' in formData ? formData.specialty || '' : ''} 
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
            <select 
              className={inputClass} 
              name="departmentId" 
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {departmentList.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
            <input 
              className={inputClass} 
              type="password" 
              name="hospitalDocpass" 
              placeholder="Doctor Password" 
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              required
            />
            <input 
              className={inputClass} 
              type="text" 
              name="workingdays" 
              placeholder="Working Days (comma separated, e.g. Monday, Tuesday)" 
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              required
            />
            <textarea 
              className={inputClass} 
              name="description" 
              placeholder="Brief Description" 
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              rows={3}
            />
          </>
        );
      case 'Patient':
        return (
          <>
            {commonFields}
            <input 
              className={inputClass} 
              type="number" 
              name="age" 
              placeholder="Age" 
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              min="1"
              max="120"
              required
            />
            <input 
              className={inputClass} 
              type="text" 
              name="bloodtype" 
              placeholder="Blood Type (optional)" 
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
            <input 
              className={inputClass} 
              type="tel" 
              name="contact" 
              placeholder="Contact Number" 
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              required
            />
          </>
        );
      case 'Receptionist':
        return (
          <>
            {commonFields}
            {hospitalField}
            <input 
              className={inputClass} 
              type="password" 
              name="hospitalReceptionpass" 
              placeholder="Receptionist Password" 
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              required
            />
          </>
        );
      default:
        return null;
    }
  }, [role, hospitalList, handleChange, formData, departmentList, handleKeyPress, isHospitalLoading, inputClass]);
};

export default Register;