# CTO Review: Architectural Decisions and Learning Summary

This project was my first practical experience with Java and Spring Boot, so I focused on building something simple, clear, and easy to follow. Along the way, I made design choices that fit the assignment but also helped me understand how Spring applications behave as they start up and how different components interact.

## 1. Backend Design Choices

I stored feature flags inside an in-memory map. This made sense because it is fast, lightweight, and naturally fits the idea of storing flag names and statuses together. Since feature flags are read very often, keeping them in memory avoids unnecessary overhead.

The flags come from a JSON file that loads at application startup. This file acts as the source of truth for the assignment. When the application starts, it reads the file and places the values into memory.

All business logic lives in a service class. Once I understood that Spring creates services as single shared instances, it became clear that the service layer is the best place to keep the logic. The controller remains simple and focuses only on receiving requests and returning responses, which matches common Spring Boot practices.

## 2. Security Considerations

For this assignment, I used Basic Authentication to protect the reload endpoint. Reloading the flags is a sensitive action, so it should not be open to everyone. Basic Authentication kept the setup straightforward and allowed me to focus more on understanding Spring Security itself.

In a real production system, I would replace Basic Auth with JWT-based authentication. JWT would allow the backend to identify the user making the request and confirm whether the user is an admin. It also allows for proper role management

## 3. What I Learned About Spring Boot and Java

The biggest learning moment for me came from understanding how Spring manages the lifecycle of objects. Coming from JavaScript, where I manually create most things, it was new to see Spring creating classes, storing them, and injecting them wherever needed. Learning dependency injection and the idea of the application context helped everything else fall into place.

I also learned how Spring Boot handles its startup sequence. This is how the feature flags are loaded into memory before the application begins serving traffic.

Adjusting to Java's strict typing and class-based structure was another part of the learning curve. But i became less stressful when i got used to it

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
