Inter-Process Communication (IPC)Debugger
  The Inter-Process Communication (IPC) Debugger is a web-based application designed to simulate and analyze 
  IPC mechanisms such as Pipes, Message Queues, Shared Memory, and Sockets. It allows users to visualize process 
  communication, detect potential deadlocks, and optimize resource allocation dynamically. Additionally, administrators
  can analyze, debug, and modify IPC settings in real time.

Features:
  •	IPC Method Simulation: Supports pipes, message queues, shared memory, and sockets.
  •	Graphical Representation: Visualizes data flow and communication between processes.
  •	Debugging Tools: Identifies deadlocks, race conditions, and synchronization errors.
  •	Custom Scenario Testing: Users can modify process behaviour and test different IPC methods dynamically.
Setup Instructions:
How to Use the Debugger:
User Panel:
1.	Select the IPC mechanism to analyse:
  o	Pipes
  o	Message Queues
  o	Shared Memory
  o	Sockets
2.	Set process parameters (e.g., number of processes, buffer size).
3.	Click "Start Simulation" to visualize data transfer.

4.	Observe the real-time updates on:
  o	Active Processes
  o	Queued Messages
  o	Completed Transfers

Admin Panel:
  1.	Modify process execution parameters (e.g., buffer size, synchronization method).
  2.	Simulate deadlocks and test race conditions.
  3.	Click "Apply Changes" to update the simulation.

Default IPC Settings
  IPC Mechanism	Default Buffer Size (KB)	Default Sync Method
  Pipes	64 KB	Blocking I/O
  Message Queues	128 KB	Mutex Locks
  Shared Memory	256 KB	Semaphore
  Sockets	512 KB	Non-Blocking I/O


Troubleshooting :
  •	Simulation not running?
  o	Ensure all dependencies are installed (C++ compiler/Java SDK).
  
  o	Check for missing files in the project directory.
  •	Deadlocks occurring frequently?
  o	Try modifying synchronization mechanisms in the Admin Panel.
  •	Data transfer delays?
  o	Adjust buffer sizes and process scheduling settings.
