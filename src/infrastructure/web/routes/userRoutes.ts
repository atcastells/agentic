import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { UserController } from '../controllers/UserController';
import { USER_CONTROLLER } from '../../../constants';

// Simple asyncHandler utility to catch errors from async route handlers
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

const router = Router();
const userController = Container.get<UserController>(USER_CONTROLLER);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDto'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User' # Assuming a User schema exists for responses
 *       400:
 *         description: Invalid input
 *       409:
 *         description: Email already in use
 */
router.post('/', asyncHandler(userController.create.bind(userController)));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User' # Assuming a User schema exists
 */
router.get('/', asyncHandler(userController.getAll.bind(userController)));

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid # Indicate it should be a UUID if applicable
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User' # Assuming a User schema exists
 *       404:
 *         description: User not found
 */
router.get('/:id', asyncHandler(userController.getById.bind(userController)));

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserDto'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User' # Assuming a User schema exists
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 *       409:
 *         description: Email already in use by another user
 */
router.put('/:id', asyncHandler(userController.update.bind(userController)));

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: User ID
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/:id', asyncHandler(userController.delete.bind(userController)));


// We need schemas for CreateUserDto, UpdateUserDto, and User for Swagger
// These would typically be defined in a central Swagger setup (e.g., src/infrastructure/web/swagger/)

export default router; 