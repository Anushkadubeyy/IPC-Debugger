let processes = [];
let deadlockExists = false;
let deadlockedProcesses = [];

function logMessage(message) {
  const logContainer = document.getElementById("log-container");
  const log = document.createElement("div");
  log.textContent = message;
  logContainer.appendChild(log);
}

function logExchange(message) {
  const exchangeLog = document.getElementById("exchange-log");
  const entry = document.createElement("div");
  entry.textContent = message;
  exchangeLog.appendChild(entry);
}

function setupProcesses() {
  const numProcesses = parseInt(document.getElementById("num-processes").value);
  const totalResources = parseInt(document.getElementById("num-resources").value);
  processes = [];
  let remainingResources = totalResources;

  for (let i = 1; i <= numProcesses; i++) {
    if (remainingResources <= 0) break;
    let allocated = Math.floor(Math.random() * (remainingResources / (numProcesses - i + 1)));
    let requested = Math.floor(Math.random() * (remainingResources / 2));
    processes.push({ id: `P${i}`, allocated, requested });
    remainingResources -= allocated;
  }

  updateProcessTable();
  logMessage(`Initialized ${processes.length} processes within a total of ${totalResources} resources.`);
}

function updateProcessTable() {
  let table = `<table border="1" width="100%">
    <tr><th>Process</th><th>Allocated</th><th>Requested</th></tr>`;
  processes.forEach(p => {
    table += `<tr><td>${p.id}</td><td>${p.allocated}</td><td>${p.requested}</td></tr>`;
  });
  table += `</table>`;
  document.getElementById("process-table").innerHTML = table;
}

function simulateIPC() {
  if (processes.length < 2) {
    logMessage("At least two processes are required for data exchange.");
    return;
  }

  const ipcMethod = document.getElementById("ipc-method").value;
  document.getElementById("exchange-log").innerHTML = "";
  let usedReceivers = new Set();

  processes.forEach(sender => {
    let receiver;
    do {
      receiver = processes[Math.floor(Math.random() * processes.length)];
    } while (sender.id === receiver.id || usedReceivers.has(receiver.id));

    usedReceivers.add(receiver.id);
    const dataSize = Math.floor(Math.random() * 500) + 100;
    const timestamp = new Date().toLocaleTimeString();
    const message = `■ ${sender.id} sent ${dataSize} bytes to ${receiver.id} using ${ipcMethod} at ${timestamp}`;
    logExchange(message);
    logMessage(message);
  });
}

function simulateDeadlock() {
  const type = document.getElementById("deadlock-type").value;
  document.getElementById("resolve-deadlock").style.display = "block";
  const i = Math.floor(Math.random() * (processes.length - 1));
  const p1 = processes[i].id;
  const p2 = processes[i + 1].id;
  let reason = "";

  switch (type) {
    case "circular-wait":
      reason = `Process ${p1} is waiting for a resource held by ${p2}, creating a cycle.`;
      break;
    case "mutual-exclusion":
      reason = `A resource is non-shareable, causing ${p1} to wait indefinitely.`;
      break;
    case "hold-and-wait":
      reason = `Process ${p1} is holding some resources while waiting for more, preventing ${p2} from proceeding.`;
      break;
    case "non-preemptive":
      reason = `Process ${p1} cannot be preempted, blocking ${p2} from execution.`;
      break;
    default:
      reason = `A generic deadlock situation has occurred.`;
  }

  logMessage(`ı. Deadlock simulated: ${type}`);
  logMessage(`● Deadlock occurred at Process ${p1} → ${p2}`);
  logMessage(`+ Reason: ${reason}`);

  updateProcessTable();
}

function checkDeadlock() {
  if (processes.length === 0) {
    logMessage("ı. No processes initialized. Initialize processes first.");
    return;
  }

  const totalResources = parseInt(document.getElementById("num-resources").value);
  let availableResources = totalResources;
  processes.forEach(p => {
    availableResources -= p.allocated;
  });

  let work = availableResources;
  let finish = Array(processes.length).fill(false);
  deadlockExists = false;
  deadlockedProcesses = [];

  for (let i = 0; i < processes.length; i++) {
    if (!finish[i] && processes[i].requested <= work) {
      if (Math.random() < 0.2) {
        deadlockedProcesses.push(processes[i].id);
        continue;
      }
      work += processes[i].allocated;
      finish[i] = true;
      i = -1;
    }
  }

  deadlockExists = finish.includes(false);

  if (deadlockExists) {
    logMessage("▲ Deadlock detected! The following processes are stuck: " + deadlockedProcesses.join(", "));
    document.getElementById("resolve-deadlock").style.display = "block";
  } else {
    logMessage("■ No deadlock detected. All processes can finish safely.");
  }
}

function resolveDeadlock() {
  if (!deadlockExists) {
    logMessage("■ No deadlock to resolve.");
    return;
  }

  if (deadlockedProcesses.length > 0) {
    const victim = deadlockedProcesses[0];
    const idx = processes.findIndex(p => p.id === victim);
    if (idx !== -1) {
      const freed = processes[idx].allocated;
      logMessage(`● Terminating ${victim} to free ${freed} resources.`);
      processes.splice(idx, 1);
      updateProcessTable();
      deadlockExists = false;
      document.getElementById("resolve-deadlock").style.display = "none";
    }
  }
}

function clearDebugLog() {
  document.getElementById("log-container").innerHTML = "";
}
