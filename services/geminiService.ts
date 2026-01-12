import { UserInput } from "../types";

/**
 * System instruction for Gemini
 * Defines strict formatting and response structure
 */
const SYSTEM_INSTRUCTION = `
You are a Senior Executive Career Coach. Your goal is to provide high-end,
actionable, and visually structured career roadmaps.

STRICT FORMATTING RULES:
1. Use Horizontal Rules (---) between every major section.
2. Use Tables for career path comparisons and skill lists.
3. Use Task Lists [ ] for roadmap steps to make them look interactive.
4. Use Blockquotes (>) for professional insights or "Mentor's Tips."
5. Never output a solid wall of text; use double line breaks between paragraphs.
`;

/**
 * Builds the final prompt sent to the backend
 */
const buildPrompt = (userInput: UserInput): string => {
  return `
${SYSTEM_INSTRUCTION}

USER PROFILE DATA:
- Background: ${userInput.background}
- Skills: ${userInput.skills}
- Interests: ${userInput.interests}
- Goals: ${userInput.goals}
- Time Commitment: ${userInput.availability}

Please generate the report in the following order:

## 📊 Executive Summary
> [Summarize their potential in 2 sentences. Use professional, high-energy language.]

---

## 🚀 Strategic Career Pathways
| Path | Alignment | Market Demand | Typical Roles |
| :--- | :--- | :--- | :--- |
| **Path A** | Why it fits | High/Growth | [Titles] |
| **Path B** | Why it fits | Emerging | [Titles] |

---

## 🛠 Targeted Skill Gap Analysis
| Skill Area | Priority | Recommended Action |
| :--- | :--- | :--- |
| [Skill] | High | [Specific course/tool] |
| [Skill] | Medium | [Project focus] |

---

## 🗓 12-Month Execution Roadmap
### Stage 1: Foundation (Months 1–3)
- [ ] **Objective:** [Primary Goal]
- [ ] **Action:** [Task 1]
- [ ] **Action:** [Task 2]

### Stage 2: Acceleration (Months 4–6)
- [ ] **Objective:** [Deepening Tech]
- [ ] **Action:** [Task 1]

### Stage 3: Market Readiness (Months 7–12)
- [ ] **Objective:** [Job Search/Portfolio]
- [ ] **Action:** [Task 1]

---

## 🏗 High-Impact Portfolio Projects
1. **[Project Name]**: [Brief description emphasizing the professional problem it solves].
2. **[Project Name]**: [Brief description of the tech stack to use].

---

## 🔗 Recommended Ecosystem
- **Top Certs:** [List 1–2]
- **Tools to Master:** [List 2–3]
- **Learning Hubs:** [e.g., Coursera, GitHub]

---

## 💡 Mentor's Final Verdict
[Provide a final motivational closing and the single most important "Next Step" they should take TODAY.]
`;
};

/**
 * Calls backend API to get career advice
 * Uses environment variable for backend URL
 */
export async function getCareerAdvice(
  userInput: UserInput
): Promise<string> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/career`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: buildPrompt(userInput)
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    return data.text ?? "No response generated.";
  } catch (error) {
    console.error("Error fetching career advice:", error);
    return "I encountered an error while generating your career roadmap. Please try again.";
  }
}
