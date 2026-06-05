import { describe, expect, test } from "bun:test"

import { REMA_BRIDGE_AUTH_MESSAGE, REMA_MODEL_REF, remaBridgeModelLines } from "../../src/cli/cmd/rema-mode"

describe("Rema bridge CLI mode", () => {
  test("lists only the Rema bridge model", () => {
    expect(remaBridgeModelLines({})).toEqual([REMA_MODEL_REF])
    expect(remaBridgeModelLines({ provider: "rema" })).toEqual([REMA_MODEL_REF])
    expect(remaBridgeModelLines({ provider: "openai" })).toEqual([])
  })

  test("verbose model output stays Rema-specific", () => {
    const lines = remaBridgeModelLines({ verbose: true })
    expect(lines[0]).toBe(REMA_MODEL_REF)
    expect(JSON.parse(lines[1]!)).toMatchObject({
      id: "rema-agent",
      providerID: "rema",
      bridge: true,
    })
  })

  test("auth notice points users to the Rema bridge instead of provider credentials", () => {
    expect(REMA_BRIDGE_AUTH_MESSAGE).toContain("RemaAI bridge")
    expect(REMA_BRIDGE_AUTH_MESSAGE).toContain("Provider credentials")
  })
})
