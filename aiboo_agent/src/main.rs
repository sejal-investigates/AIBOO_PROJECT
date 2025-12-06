use sysinfo::{System, SystemExt, ProcessExt, PidExt};
use std::collections::HashSet;
use tokio::time::{sleep, Duration};
use reqwest;
use serde_json;

#[tokio::main]
async fn main() {
    println!("AiBoO Agent - Process Creation Monitor Started");

    let mut system = System::new_all();
    system.refresh_processes();

    // Track already-seen processes
    let mut known_pids: HashSet<u32> = system
        .processes()
        .keys()
        .map(|pid| pid.as_u32())
        .collect();

    loop {
        system.refresh_processes();

        for (pid, process) in system.processes() {
            let pid_u32 = pid.as_u32();

            // Detect new process
            if !known_pids.contains(&pid_u32) {
                let name = process.name().to_string();
                let cmd = process.cmd().join(" ");
                let parent = process.parent().map(|p| p.as_u32()).unwrap_or(0);

                println!("\nNEW PROCESS DETECTED");
                println!("PID: {}", pid_u32);
                println!("Name: {}", name);
                println!("Command Line: {}", cmd);
                println!("Parent PID: {}", parent);
                println!("-----------------------------------------");

                // ----------------------- SEND TO BACKEND -----------------------
                let client = reqwest::Client::new();

                let payload = serde_json::json!({
                    "agent_id": "DESKTOP-SEJAL",
                    "event_type": "process_creation",
                    "data": {
                        "pid": pid_u32,
                        "name": name,
                        "command_line": cmd,
                        "parent_pid": parent
                    }
                });

                match client.post("http://localhost:4000/api/ingest/event")
                    .json(&payload)
                    .send()
                    .await
                {
                    Ok(_) => println!("Event sent to backend"),
                    Err(err) => println!("Failed to send event: {:?}", err),
                };

                known_pids.insert(pid_u32);
            }
        }

        sleep(Duration::from_millis(800)).await;
    }
}
