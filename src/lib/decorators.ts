/* eslint-disable @typescript-eslint/no-explicit-any */
    
interface UserCreationParams {
    username: string;
    password?: string;
    role?: 'admin' | 'user'; 
    status?: 'active' | 'inactive';
    createdAt?: Date;
}

/**
 * Decorator function to apply default properties to a user object (role: 'user', status: 'active', createdAt: Date).
 * NOTE: Requires "experimentalDecorators": true in tsconfig.json.
 */
export function setDefaultUserProps() {
    // This is a factory function that returns the actual decorator (legacy 3-argument syntax)
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        
        const originalMethod = descriptor.value;

        // We overwrite the value of the original method
        descriptor.value = function (params: UserCreationParams): any {
            
            // 1. Logic to apply defaults (inside the decorator wrapper)
            const userWithDefaults: UserCreationParams = {
                ...params,
                role: params.role || 'user', 
                status: params.status || 'active', 
                createdAt: params.createdAt || new Date(),
            };

            // 2. Call the original method with the enriched parameters
            console.log(`[DECORATOR] Applied defaults for user: ${userWithDefaults.username}`);
            // We use .call(this, ...) to ensure that 'this' is the UserStore instance
            return originalMethod.call(this, userWithDefaults); 
        };

        // The method decorator must return the modified descriptor
        return descriptor;
    };
}