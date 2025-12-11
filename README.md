# CTO Review: Architectural Decisions and Learning Summary

## Time Spent

**Total Time:** Just over 7 hours of focused work on the project

**Learning Process:** Before starting the project, I spent Sunday and Monday going through Java and Spring Boot fundamentals. I couldn't start immediately since I was new to both Java and Spring, so I first familiarized myself with the syntax and how the framework works in general. I worked through a comprehensive Spring Boot tutorial to build foundational understanding, then applied what I learned to this assignment.

This project was my first practical experience with Java and Spring Boot, so I focused on building something simple, clear, and easy to follow. Along the way, I made design choices that fit the assignment but also helped me understand how Spring applications behave as they start up and how different components interact.

## 1. Backend Design Choices

I stored feature flags inside an in-memory map. This made sense because it is fast, lightweight, and naturally fits the idea of storing flag names and statuses together. Since feature flags are read very often, keeping them in memory avoids unnecessary overhead.

The flags come from a JSON file that loads at application startup. This file acts as the source of truth for the assignment. When the application starts, it reads the file and places the values into memory.

All business logic lives in a service class. Once I understood that Spring creates services as single shared instances, it became clear that the service layer is the best place to keep the logic. The controller remains simple and focuses only on receiving requests and returning responses, which matches common Spring Boot practices.

## 2. Security Considerations

For this assignment, I used Basic Authentication to protect the reload endpoint. Reloading the flags is a sensitive action, so it should not be open to everyone. Basic Authentication kept the setup straightforward and allowed me to focus more on understanding Spring Security itself.

In a real production system, I would replace Basic Auth with JWT-based authentication. JWT would allow the backend to identify the user making the request and confirm whether the user is an admin. It also allows for proper role management

## 3. What I Learned About Spring Boot and Java

### The Hardest Concept: Java's OOP Structure and Type System

Coming from JavaScript ecosystem , the biggest challenge was adapting to Java's strict type system and class-based OOP structure. Every variable, method return, and parameter needs an explicit type declaration. Understanding when to create classes, how to use access modifiers (public, private), and concepts like inheritance became critical rather than optional.

**How I overcame it:**

I spent Sunday and Monday going through Java fundamentals and a Spring Boot tutorial before starting the project. I worked through examples to understand class structure, access modifiers, and how Spring's dependency injection fits into Java's OOP model. The key was building understanding incrementally rather than trying to implement everything at once

## 4. Real Production System

If this system were used in a real company, I would replace the JSON setup with a database-backed solution. A JSON file becomes harder to manage as the number of flags grows. A database table would allow flags to be created, updated, and tracked reliably.

I would also introduce an internal admin dashboard so product managers or engineers can update flags without editing files. As the system grows, I would add caching, such as Redis, to avoid repeated database reads.

Finally, real feature flag systems usually support more advanced release strategies. I would include options like percentage rollouts.

## 5. Final

This project helped me understand core Spring Boot concepts such as configuration loading, dependency injection, and application lifecycle. I intentionally kept the design simple so I could focus on understanding how Spring works, T

---

## Running the Application

### Development Mode

**Backend:**

```bash
cd flag-service-backend
./mvnw spring-boot:run
```

**Frontend:**

```bash
cd flag-service-frontend
npm install
npm run dev
```

### Docker

```bash
docker-compose up
```

### Endpoints

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`
- Get Flag: `GET http://localhost:8080/api/flags/{flagName}`
- Reload Flags: `POST http://localhost:8080/api/admin/flags/reload` (Basic Auth: `admin` / `password123`)

**Example - Reload Flags:**

```bash
curl -X POST http://localhost:8080/api/admin/flags/reload -u admin:password123
```
