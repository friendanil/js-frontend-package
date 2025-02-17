export function Tracer(target: Object, propertyKey: string|symbol, descriptor: PropertyDescriptor){
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]){
        console.log(`Method ${String(propertyKey)} called with arguments:`, args);
        return originalMethod.apply(this, args);
    };
}