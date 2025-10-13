// 代码生成时间: 2025-10-14 03:41:32
 * It follows TypeScript best practices and is designed to be maintainable and extensible.
 */

// Import necessary modules from Deno
import { assertEquals } from "https://deno.land/std@0.158.0/testing/asserts.ts";

/**
 * Represents a Virtual Machine
 */
class VirtualMachine {
    private id: string;
    private name: string;
    private status: string; // Can be "running", "stopped", or "suspended"

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.status = "stopped"; // Default status
    }

    /**
     * Starts the virtual machine
     */
    start(): void {
        if (this.status !== "stopped") {
            throw new Error("VM is already running or suspended");
        }
        this.status = "running";
        console.log(`VM ${this.name} is starting...`);
    }

    /**
     * Stops the virtual machine
     */
    stop(): void {
        if (this.status !== "running") {
            throw new Error("VM is not running");
        }
        this.status = "stopped";
        console.log(`VM ${this.name} is stopping...`);
    }

    /**
     * Suspends the virtual machine
     */
    suspend(): void {
        if (this.status !== "running") {
            throw new Error("VM is not running");
        }
        this.status = "suspended";
        console.log(`VM ${this.name} is suspending...`);
    }

    /**
     * Resumes the virtual machine from suspension
     */
    resume(): void {
        if (this.status !== "suspended") {
            throw new Error("VM is not suspended");
        }
        this.status = "running";
        console.log(`VM ${this.name} is resuming...`);
    }

    /**
     * Retrieves the status of the virtual machine
     */
    getStatus(): string {
        return this.status;
    }
}

/**
 * Manages a collection of virtual machines
 */
class VirtualMachineManager {
    private vms: Map<string, VirtualMachine>;

    constructor() {
        this.vms = new Map();
    }

    /**
     * Adds a new virtual machine
     */
    addVM(id: string, name: string): void {
        if (this.vms.has(id)) {
            throw new Error("VM with the same ID already exists");
        }
        const vm = new VirtualMachine(id, name);
        this.vms.set(id, vm);
        console.log(`VM ${name} added successfully`);
    }

    /**
     * Removes a virtual machine by ID
     */
    removeVM(id: string): void {
        if (!this.vms.has(id)) {
            throw new Error("VM with the given ID does not exist");
        }
        this.vms.delete(id);
        console.log(`VM with ID ${id} removed successfully`);
    }

    /**
     * Starts a virtual machine by ID
     */
    startVM(id: string): void {
        const vm = this.vms.get(id);
        if (!vm) {
            throw new Error("VM with the given ID does not exist");
        }
        vm.start();
    }

    /**
     * Stops a virtual machine by ID
     */
    stopVM(id: string): void {
        const vm = this.vms.get(id);
        if (!vm) {
            throw new Error("VM with the given ID does not exist");
        }
        vm.stop();
    }

    /**
     * Suspends a virtual machine by ID
     */
    suspendVM(id: string): void {
        const vm = this.vms.get(id);
        if (!vm) {
            throw new Error("VM with the given ID does not exist");
        }
        vm.suspend();
    }

    /**
     * Resumes a virtual machine by ID from suspension
     */
    resumeVM(id: string): void {
        const vm = this.vms.get(id);
        if (!vm) {
            throw new Error("VM with the given ID does not exist");
        }
        vm.resume();
    }
}

// Example usage
const manager = new VirtualMachineManager();
manager.addVM("vm-001", "Ubuntu Server");
manager.startVM("vm-001");
manager.suspendVM("vm-001");
manager.resumeVM("vm-001");
manager.stopVM("vm-001");
manager.removeVM("vm-001");