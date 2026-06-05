export const REMA_PROVIDER_ID = "rema"
export const REMA_MODEL_ID = "rema-agent"
export const REMA_MODEL_REF = `${REMA_PROVIDER_ID}/${REMA_MODEL_ID}`
export const REMA_BRIDGE_AUTH_MESSAGE =
  "Rema bridge mode uses the authenticated RemaAI bridge. Provider credentials and OpenCode console accounts are not managed here."

export function remaBridgeModeEnabled() {
  return process.env.REMA_TRANSPORT === "bridge" || process.env.OPENCODE_REMA_TRANSPORT === "bridge"
}

export function remaModelSelection() {
  return {
    providerID: REMA_PROVIDER_ID,
    modelID: REMA_MODEL_ID,
  }
}

export function remaBridgeModelLines(input: { provider?: string; verbose?: boolean }) {
  if (input.provider && input.provider !== REMA_PROVIDER_ID) return []
  if (!input.verbose) return [REMA_MODEL_REF]
  return [
    REMA_MODEL_REF,
    JSON.stringify(
      {
        id: REMA_MODEL_ID,
        providerID: REMA_PROVIDER_ID,
        name: "Rema AgentOS Workflow",
        bridge: true,
      },
      null,
      2,
    ),
  ]
}
