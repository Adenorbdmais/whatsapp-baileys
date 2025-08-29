let sessions = [];

async function createSession(name) {
  const session = { id: Date.now(), name, status: "active" };
  sessions.push(session);
  return session;
}

async function listSessions() {
  return sessions;
}

module.exports = { createSession, listSessions };

