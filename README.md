Project Title

AdaptivePath – Personalized Learning Platform

One-line project description.
A web-based adaptive learning platform that tracks concept-level mastery, detects prerequisite gaps, and unlocks topics through checkpoint-based progression.

1. Problem Statement
Problem Title

Real-Time Detection of Conceptual Learning Gaps in Higher Education

Problem Description

India produces over 15 million graduates annually. However, many students enter higher education without mastering foundational concepts from earlier years. Traditional classroom systems assume uniform learning pace and comprehension, which is unrealistic in large classrooms.

Students often progress without mastering prerequisite concepts. Learning gaps remain undetected until major examinations, by which time weak foundations have compounded into serious academic challenges. Existing online platforms are content-rich but passive and non-adaptive.

There is no intelligent system that continuously maps conceptual understanding and adapts dynamically to individual student needs.

Target Users

High school students and undergraduate students specializing in computer
science.

Existing Gaps

No real-time concept mastery tracking

No structured prerequisite-based diagnostics

Static, non-adaptive learning paths

Limited checkpoint-based progression systems

2. Problem Understanding & Approach
Root Cause Analysis

Students advance without mastering prerequisites

Assessments are infrequent and not diagnostic

Teachers lack real-time visibility into conceptual understanding

Learning gaps accumulate silently

No adaptive progression mechanism

The root issue is the absence of a personalized, checkpoint-based adaptive system.

Solution Strategy

We design:

Topic-based checkpoints

MCQ-based mastery testing

Prerequisite diagnostic testing

Adaptive resource recommendation

Unlock-based progression system

The system determines whether weakness is:

Topic-specific

Foundational

Then dynamically adapts the next learning step.

3. Proposed Solution
Solution Overview

AdaptivePath is a website where students progress through structured checkpoints. Each checkpoint represents a topic. After passing the quiz, the next checkpoint unlocks.

If a student fails:

The system evaluates prerequisite topics

Determines root cause

Recommends appropriate learning resources

Completion of the final checkpoint indicates strong conceptual mastery.

Core Idea

Each topic = One checkpoint

Each checkpoint = MCQ-based quiz

Passing → Next checkpoint unlocks

Failing → Prerequisite test triggered

Decision Logic:

If prerequisite strong → Provide topic-specific reinforcement

If prerequisite weak → Provide foundational reinforcement

Key Features

📍 Checkpoint-based progression

🔓 Topic unlocking mechanism

📊 Concept-level mastery tracking

🔁 Prerequisite diagnostic engine

📚 Personalized resource recommendation

📈 Adaptive learning path

4. System Architecture
High-Level Flow

User → Frontend → Backend → Model → Database → Response

Architecture Description

User attempts checkpoint quiz via frontend.

Frontend sends responses to backend.

Backend updates mastery probability using model.

Gap detection logic checks prerequisite performance.

Database stores updated mastery state.

Backend returns:

Unlock next checkpoint

Trigger prerequisite quiz

Recommend learning resources

Architecture Diagram

(Add system architecture diagram image here)

5. Database Design
ER Diagram

(Add ER diagram image here)

ER Diagram Description

User

user_id

name

email

Subject

subject_id

subject_name

Topic

topic_id

subject_id

prerequisite_topic_id

checkpoint_number

Question

question_id

topic_id

difficulty_level

correct_option

QuizAttempt

attempt_id

user_id

topic_id

score

mastery_probability

Relationships:

One subject → Many topics

One topic → Many questions

One user → Many quiz attempts

Topics connected through prerequisite relationship

6. Dataset Selected
Dataset Name

Concept-Tagged MCQ Question Bank

Source

Instructor-created and curated academic datasets

Data Type

Multiple Choice Questions

Topic-tagged

Difficulty-labeled

Selection Reason

Structured topic tagging is required for prerequisite tracking and adaptive unlocking.

Preprocessing Steps

Tag questions with topic ID

Assign difficulty levels

Validate correct answers

Store in structured database format

7. Model Selected
Model Name

Bayesian Knowledge Tracing (Probability-Based Model)

Selection Reasoning

Interpretable

Lightweight

Supports real-time mastery updating

Suitable for checkpoint unlocking logic

Uses:

Prior mastery probability

Slip probability

Guess probability

Bayesian updating

Alternatives Considered

Percentage-based mastery model

Deep Knowledge Tracing (Neural Networks)

Item Response Theory

Not selected due to complexity and infrastructure constraints.

Evaluation Metrics

Mastery improvement rate

Checkpoint completion rate

Prerequisite gap detection accuracy

User progression speed

Engagement duration

8. Technology Stack
Frontend

HTML

CSS

JavaScript

React

Backend

Node.js

Express

ML/AI

Custom Bayesian probability-based mastery engine

Database

MongoDB / PostgreSQL

Deployment

Vercel / Render / AWS

9. API Documentation & Testing
API Endpoints List

Endpoint 1: Register User
POST /api/register

Endpoint 2: Attempt Checkpoint Quiz
POST /api/quiz/attempt

Endpoint 3: Get User Mastery State
GET /api/user/mastery

Endpoint 4: Get Next Recommended Topic
GET /api/recommendation

API Testing Screenshots

(Add Postman / Thunder Client screenshots here)

10. Module-wise Development & Deliverables
Checkpoint 1: Research & Planning

Deliverables:
Concept dependency mapping

Checkpoint structuring

System architecture design

Checkpoint 2: Backend Development

Deliverables:

Authentication system

Quiz APIs

Mastery computation logic

Prerequisite detection engine

Checkpoint 3: Frontend Development

Deliverables:

Duolingo-style UI

Checkpoint path interface

MCQ quiz module

Unlock animations

Checkpoint 4: Model Training

Deliverables:

Implement Bayesian updating

Define slip and guess probabilities

Simulate student responses

Checkpoint 5: Model Integration

Deliverables:

Connect frontend to mastery engine

Enable adaptive checkpoint unlocking

Integrate resource recommendation

Checkpoint 6: Deployment

Deliverables:

Cloud deployment

Production database setup

Public demo release

11. End-to-End Workflow

Student logs in

Selects subject

Attempts checkpoint quiz

System calculates mastery probability

If mastery ≥ threshold:
Unlock next checkpoint

If mastery < threshold:
Trigger prerequisite quiz

Based on prerequisite results:
Provide topic reinforcement
Or foundational reinforcement

Continue until final checkpoint completion

Completion of final checkpoint indicates strong conceptual mastery.

12. Demo & Video

Live Demo Link: (Add link here)

Demo Video Link: (Add link here)

GitHub Repository: (Add repository link here)

13. Hackathon Deliverables Summary

Functional checkpoint-based adaptive learning website

Duolingo-style UI progression

Real-time gap detection engine

Prerequisite diagnostic mechanism

Adaptive resource recommendation

Deployed live demo

Complete documentation and API testing

AdaptivePath transforms passive progression into structured, intelligent, and adaptive learning.

14. Team Roles & Responsibilities
Member Name	Role	Responsibilities
Sumit Roy Chowdhury: Frontend Developer
Rwitankar Pal: Frontend Developer
Aritra Sharkhel: Backend Developer

15. Future Scope & Scalability
Short-Term

Add more subjects and expand the concept-checkpoint structure across multiple academic streams (Science, Commerce, Competitive Exams).

Improve question bank size, difficulty calibration, and resource recommendation accuracy.

Enhance analytics dashboard for institutions and teachers.

Long-Term

Introduce a personalized mentor feature that provides guided academic support based on individual learning patterns and mastery data.

Integrate AI-driven conversational doubt resolution and adaptive study planning.

Expand to multi-language support to increase accessibility across regions.

Scale the platform for institutional adoption with centralized monitoring and performance analytics.

16. Known Limitations

Dependence on MCQ-Based Assessment
The current system primarily relies on multiple-choice questions to estimate mastery. This may not fully capture deep conceptual understanding, problem-solving ability, or subjective reasoning skills.

Initial Question Bank Size
Effectiveness depends heavily on a well-structured and sufficiently large concept-tagged question bank. Limited questions may reduce diagnostic accuracy.

Model Simplification
The Bayesian Knowledge Tracing model is lightweight and interpretable, but it may not capture complex learning behaviors compared to advanced neural models.

No Real-Time Human Interaction (Current Version)
The platform currently does not include live mentoring or real-time teacher intervention. Support is system-driven.

Dependency Mapping Accuracy
The prerequisite structure is manually designed. Incorrect or incomplete dependency mapping can affect gap detection accuracy.

Internet Dependency
The platform requires internet connectivity, which may limit accessibility in low-connectivity regions.

Scalability Testing
Large-scale performance under thousands of concurrent users has not yet been fully stress-tested.

17. Impact
Students will be able to learn at their own pace without being pressured by a uniform classroom speed.

The platform makes learning structured and engaging through checkpoint-based progression and gamification, increasing motivation and consistency.

It strengthens foundational understanding by ensuring prerequisite mastery before unlocking higher-level concepts — reducing long-term conceptual gaps.

Learning becomes simpler and more efficient as the platform provides all necessary, curated resources for each weak topic, eliminating the need for students to search externally.

Most importantly, the system ensures that students build strong conceptual foundations before advancing