# Project Title
AdaptivePath – Personalized Learning Platform

One-line project description.  
A web-based adaptive learning platform that analyzes quiz performance using AI, detects weak concepts and prerequisites, and unlocks topics through checkpoint-based progression.

---

## 1. Problem Statement

### Problem Title
Real-Time Detection of Conceptual Learning Gaps in Higher Education

### Problem Description
India produces over 15 million graduates annually. However, many students enter higher education without mastering foundational concepts from earlier years. Traditional classroom systems assume uniform learning pace and comprehension, which is unrealistic in large classrooms.

Students often progress without mastering prerequisite concepts. Learning gaps remain undetected until major examinations, by which time weak foundations have compounded into serious academic challenges. Existing online platforms are content-rich but passive and non-adaptive.

There is no intelligent system that continuously maps conceptual understanding and adapts dynamically to individual student needs.

### Target Users
- Undergraduate students specializing in Data Structures and Algorithms (DSA)

### Existing Gaps
- No real-time concept mastery tracking
- No structured prerequisite-based diagnostics
- Static, non-adaptive learning paths
- Limited checkpoint-based progression systems

---

## 2. Problem Understanding & Approach

### Root Cause Analysis
- Students advance without mastering prerequisites
- Assessments are infrequent and not diagnostic
- Teachers lack real-time visibility into conceptual understanding
- Learning gaps accumulate silently
- No adaptive progression mechanism

The root issue is the absence of a personalized, checkpoint-based adaptive system that dynamically responds to student performance.

### Solution Strategy
We design:

- Topic-based checkpoints
- MCQ-based mastery testing
- AI-driven performance analysis
- Prerequisite diagnostic testing
- Adaptive resource recommendation
- Unlock-based progression system

The system determines whether weakness is:

- Topic-specific  
- Foundational  

Then dynamically adapts the next learning step.

---

## 3. Proposed Solution

### Solution Overview
AdaptivePath is a website where students progress through structured checkpoints. Each checkpoint represents a topic. After passing the quiz, the next checkpoint unlocks.

If a student fails:

- The AI analyzes performance patterns
- Identifies weak concepts
- Evaluates prerequisite topics
- Recommends targeted learning resources

Completion of the final checkpoint indicates strong conceptual mastery.

### Core Idea
- Each topic = One checkpoint  
- Each checkpoint = MCQ-based quiz  
- Passing → Next checkpoint unlocks  
- Failing → AI analyzes incorrect responses  

**Decision Logic:**

- If performance satisfactory → Unlock next checkpoint  
- If performance poor → Identify weak concepts  
- If prerequisite strong → Provide topic-specific reinforcement  
- If prerequisite weak → Provide foundational reinforcement  

### Key Features
- 📍 Checkpoint-based progression
- 🔓 Topic unlocking mechanism
- 📊 Concept-level performance analysis
- 🤖 AI-based weak topic detection
- 🔁 Prerequisite diagnostic engine
- 📚 Personalized YouTube video recommendations
- 💻 Curated LeetCode and Codeforces practice problems
- 📈 Adaptive learning path

---

## 4. System Architecture

### High-Level Flow
User → Frontend → Backend → AI Analysis Engine → Database → Response

### Architecture Description
1. User attempts checkpoint quiz via frontend.
2. Frontend sends responses to backend.
3. Backend evaluates raw score and topic-level accuracy.
4. AI engine analyzes:
   - Incorrect answers
   - Concept tags
   - Difficulty levels
   - Performance patterns
5. Weak topics are identified.
6. Resource recommendation engine fetches:
   - Relevant YouTube videos
   - Curated LeetCode and Codeforces problems
7. Database stores updated performance data.
8. Backend returns:
   - Unlock next checkpoint
   - Trigger prerequisite quiz
   - Personalized reinforcement resources

### Architecture Diagram
(Add system architecture diagram image here)

---

## 5. Database Design

### ER Diagram
(Add ER diagram image here)

### ER Diagram Description

**User**
- user_id
- name
- email

**Subject**
- subject_id
- subject_name

**Topic**
- topic_id
- subject_id
- prerequisite_topic_id
- checkpoint_number

**Question**
- question_id
- topic_id
- difficulty_level
- concept_tag
- correct_option

**QuizAttempt**
- attempt_id
- user_id
- topic_id
- score
- weak_concepts_identified

**Resource**
- resource_id
- topic_id
- resource_type (YouTube / LeetCode / Codeforces)
- resource_link

**Relationships:**
- One subject → Many topics
- One topic → Many questions
- One user → Many quiz attempts
- Topics connected through prerequisite relationship
- One topic → Many recommended resources

---

## 6. Dataset Selected

### Dataset Name
Concept-Tagged MCQ Question Bank

### Source
Instructor-created and curated academic datasets

### Data Type
- Multiple Choice Questions
- Topic-tagged
- Concept-labeled
- Difficulty-labeled

### Selection Reason
Structured topic and concept tagging is required for accurate AI-based weak concept detection and resource recommendation.

### Preprocessing Steps
- Tag questions with topic ID
- Assign concept labels
- Assign difficulty levels
- Validate correct answers
- Store in structured database format

---

## 7. Model Selected

### Model Name
AI-Based Performance Analysis & Recommendation Engine

### Selection Reasoning
- Provides flexible and interpretable feedback
- Identifies weak concepts based on answer patterns
- Generates personalized explanations
- Dynamically recommends learning resources
- Easier to scale and enhance compared to probabilistic models

### Alternatives Considered
- Percentage-based mastery model
- Bayesian Knowledge Tracing
- Deep Knowledge Tracing (Neural Networks)

Not selected due to limited adaptability, higher mathematical complexity, or infrastructure requirements.

### Evaluation Metrics
- Weak topic detection accuracy
- Checkpoint completion rate
- Improvement in re-attempt scores
- User progression speed
- Engagement duration

---

## 8. Technology Stack

### Frontend
- HTML
- CSS
- JavaScript
- React

### Backend
- Node.js
- Express

### ML/AI
- AI-based performance analysis using LLM APIs
- Rule-based weak concept detection logic
- Recommendation engine for YouTube and coding platforms

### Database
- PostgreSQL

### Deployment
- Vercel / Render / AWS

---

## 9. API Documentation & Testing

### API Endpoints List

- **Endpoint 1: Register User**  
`POST /api/register`

- **Endpoint 2: Attempt Checkpoint Quiz**  
`POST /api/quiz/attempt`

- **Endpoint 3: Get User Performance Analysis**  
`GET /api/user/analysis`

- **Endpoint 4: Get Recommended Resources**  
`GET /api/recommendation`

### API Testing Screenshots
(Add Postman / Thunder Client screenshots here)

---

## 10. Module-wise Development & Deliverables

### Checkpoint 1: Research & Planning
**Deliverables:**
- Concept dependency mapping
- Checkpoint structuring
- System architecture design

### Checkpoint 2: Backend Development
**Deliverables:**
- Authentication system
- Quiz APIs
- AI analysis integration
- Prerequisite detection engine

### Checkpoint 3: Frontend Development
**Deliverables:**
- Checkpoint-style UI
- Path progression interface
- MCQ quiz module
- Unlock animations

### Checkpoint 4: AI Integration
**Deliverables:**
- AI performance summary generation
- Weak concept detection logic
- Structured response formatting

### Checkpoint 5: Recommendation Engine Integration
**Deliverables:**
- YouTube video recommendation integration
- Curated LeetCode and Codeforces mapping
- Dynamic resource display

### Checkpoint 6: Deployment
**Deliverables:**
- Cloud deployment
- Production database setup
- Public demo release

---

## 11. End-to-End Workflow

1. Student logs in
2. Selects subject
3. Attempts checkpoint quiz
4. Backend calculates topic-wise accuracy
5. AI analyzes incorrect answers and identifies weak concepts
6. If performance satisfactory → Unlock next checkpoint
7. If performance poor → Trigger prerequisite evaluation
8. System recommends:
   - YouTube videos
   - LeetCode practice problems
   - Codeforces problems
9. Student revises and re-attempts quiz
10. Continue until final checkpoint completion

Completion of final checkpoint indicates strong conceptual mastery.

---

## 12. Demo & Video

- **Live Demo Link:** (Add link here)
- **Demo Video Link:** (Add link here)
- **GitHub Repository:** (Add repository link here)

---

## 13. Hackathon Deliverables Summary

- Functional checkpoint-based adaptive learning website
- Duolingo-style UI progression
- AI-driven performance analysis engine
- Weak concept identification system
- Personalized YouTube and coding problem recommendations
- Adaptive checkpoint unlocking mechanism
- Deployed live demo
- Complete documentation and API testing

AdaptivePath transforms passive progression into structured, intelligent, AI-driven adaptive learning.

---

## 14. Team Roles & Responsibilities

| Member Name | Role | Responsibilities |
|-------------|------|-----------------|

---

## 15. Future Scope & Scalability

### Short-Term
- Expand question bank and topic coverage
- Improve AI feedback personalization
- Add analytics dashboard for performance insights

### Long-Term
- Real-time conversational AI mentor
- Automated difficulty adaptation
- Multi-language support
- Institutional-scale deployment

---

## 16. Known Limitations

- Dependence on MCQ-based assessment may not capture deep reasoning skills
- Effectiveness depends on quality and tagging accuracy of question bank
- AI feedback quality depends on prompt engineering and API performance
- No real-time human mentoring in current version
- Manual prerequisite mapping may introduce structural bias
- Requires stable internet connectivity
- Not yet stress-tested at very large scale

---

## 17. Impact

- Students learn at their own pace
- Structured and gamified progression increases engagement
- Identifies weak concepts precisely
- Provides curated video and coding practice resources
- Strengthens foundational understanding before advancing
- Ensures strong conceptual mastery before higher-level topics


Project link: personalized-learning-system-gamma.vercel.app
