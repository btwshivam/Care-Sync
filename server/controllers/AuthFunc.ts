import { Request, Response } from "express";
import { AdminRequest, DocRequest, loginRequest, PatientRequest, ReceptionRequest, roleSchema } from "../types/userTypes";
import { comparePassword, generateToken, hashPassword } from "../utils/auth";
import { prisma } from "..";

/**
 * Register a new user based on their role
 */
export const registerUser = async (req: Request, res: Response) => {
    try {
        // Validate role
        if (!req.body.role) {
            return res.status(400).json({ message: 'Role is required' });
        }

        const { name, email, password, role } = req.body;

        // Check if email already exists in any user table
        const existingUser = await checkExistingUser(email);
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);
        if (!hashedPassword) {
            return res.status(500).json({ message: 'Error hashing password' });
        }

        let user, hospitalPass;

        switch (role) {
            case 'Admin':
                // Validate admin request
                if (!AdminRequest.safeParse(req.body).success) {
                    return res.status(400).json({ message: 'Invalid admin registration data' });
                }

                // Verify hospital and admin password
                hospitalPass = await prisma.hospital.findFirst({
                    where: { name: req.body.hospitalName },
                    select: { adminPass: true, id: true }
                });

                if (!hospitalPass) {
                    return res.status(404).json({ message: 'Hospital not found' });
                }
                
                if (hospitalPass.adminPass !== req.body.hospitalAdminpass) {
                    return res.status(401).json({ message: 'Invalid admin password' });
                }

                // Create admin user
                user = await prisma.admin.create({
                    data: { 
                        name, 
                        email, 
                        password: hashedPassword, 
                        hospitalId: hospitalPass.id 
                    }
                });
                break;

            case 'Doctor':
                // Validate doctor request
                if (!DocRequest.safeParse(req.body).success) {
                    return res.status(400).json({ message: 'Invalid doctor registration data' });
                }

                // Verify hospital and doctor password
                hospitalPass = await prisma.hospital.findFirst({
                    where: { name: req.body.hospitalName },
                    select: { doctorPass: true, id: true }
                });

                if (!hospitalPass) {
                    return res.status(404).json({ message: 'Hospital not found' });
                }
                
                if (hospitalPass.doctorPass !== req.body.hospitalDocpass) {
                    return res.status(401).json({ message: 'Invalid doctor password' });
                }

                // Create doctor user
                user = await prisma.doctor.create({
                    data: {
                        name, 
                        email, 
                        password: hashedPassword,
                        departmentId: req.body.departmentId,
                        specialty: req.body.specialty || "General",
                        hospitalId: hospitalPass.id,
                        workingdays: req.body.workingdays
                    }
                });
                break;

            case 'Patient':
                // Validate patient request
                if (!PatientRequest.safeParse(req.body).success) {
                    return res.status(400).json({ message: 'Invalid patient registration data' });
                }

                // Create patient user
                user = await prisma.patient.create({
                    data: {
                        name, 
                        email, 
                        password: hashedPassword,
                        age: Number(req.body.age),
                        contact: req.body.contact as string,
                        bloodtype: req.body.bloodtype
                    }
                });
                break;

            case 'Receptionist':
                // Validate receptionist request
                if (!ReceptionRequest.safeParse(req.body).success) {
                    return res.status(400).json({ message: 'Invalid receptionist registration data' });
                }

                // Verify hospital and receptionist password
                hospitalPass = await prisma.hospital.findFirst({
                    where: { name: req.body.hospitalName },
                    select: { receptionistPass: true, id: true }
                });

                if (!hospitalPass) {
                    return res.status(404).json({ message: 'Hospital not found' });
                }
                
                if (hospitalPass.receptionistPass !== req.body.hospitalReceptionpass) {
                    return res.status(401).json({ message: 'Invalid receptionist password' });
                }

                // Create receptionist user
                user = await prisma.receptionist.create({
                    data: {
                        name, 
                        email, 
                        password: hashedPassword,
                        hospitalId: hospitalPass.id
                    }
                });
                break;

            case 'Inventoryman':
                // Validate inventory manager request
                if (!roleSchema.safeParse(req.body).success) {
                    return res.status(400).json({ message: 'Invalid inventory manager registration data' });
                }

                // Verify hospital and inventory password
                hospitalPass = await prisma.hospital.findFirst({
                    where: { name: req.body.hospitalName },
                    select: { inventoryPass: true, id: true }
                });

                if (!hospitalPass) {
                    return res.status(404).json({ message: 'Hospital not found' });
                }
                
                if (hospitalPass.inventoryPass !== req.body.hospitalInventorypass) {
                    return res.status(401).json({ message: 'Invalid inventory password' });
                }

                // Create inventory manager user
                user = await prisma.inventoryman.create({
                    data: {
                        name, 
                        email, 
                        password: hashedPassword,
                        hospitalId: hospitalPass.id
                    }
                });
                break;

            default:
                return res.status(400).json({ message: 'Invalid role' });
        }

        // Generate JWT token
        const token = generateToken(user.id, role);
        
        // Return user data (without password) and token
        res.status(201).json({ 
            message: 'Registration successful',
            token, 
            user: {...user, password: null} 
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'User registration failed. Please try again.' });
    }
};

/**
 * Login a user based on their role
 */
export const loginUser = async (req: Request, res: Response) => {
    try {
        // Validate login request
        if (!loginRequest.safeParse(req.body).success) {
            return res.status(400).json({ message: 'Invalid login data' });
        }

        const { email, password, role } = req.body;

        // Find user based on role
        let user: any;
        switch (role) {
            case 'Admin':
                user = await prisma.admin.findUnique({ where: { email } });
                break;
            case 'Doctor':
                user = await prisma.doctor.findUnique({ where: { email } });
                break;
            case 'Patient':
                user = await prisma.patient.findUnique({ where: { email } });
                break;
            case 'Inventoryman':
                user = await prisma.inventoryman.findUnique({ where: { email } });
                break;
            case 'Receptionist':
                user = await prisma.receptionist.findUnique({ where: { email } });
                break;
            default:
                return res.status(400).json({ message: 'Invalid role' });
        }

        // Check if user exists and password is correct
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = generateToken(user.id, role);
        
        // Return user data (without password) and token
        res.status(200).json({ 
            message: 'Login successful',
            token, 
            user: {...user, password: null} 
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed. Please try again.' });
    }
};

/**
 * Helper function to check if email already exists in any user table
 */
async function checkExistingUser(email: string): Promise<boolean> {
    const adminUser = await prisma.admin.findUnique({ where: { email } });
    if (adminUser) return true;

    const doctorUser = await prisma.doctor.findUnique({ where: { email } });
    if (doctorUser) return true;

    const patientUser = await prisma.patient.findUnique({ where: { email } });
    if (patientUser) return true;

    const inventoryUser = await prisma.inventoryman.findUnique({ where: { email } });
    if (inventoryUser) return true;

    const receptionistUser = await prisma.receptionist.findUnique({ where: { email } });
    if (receptionistUser) return true;

    return false;
}