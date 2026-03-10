# 🏗️ RoomSetu Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                               │
│                    (Browser - localhost:5173)                        │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ HTTP Requests
                             │ (REST API)
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      REACT FRONTEND                                  │
│                         (Vite + React)                               │
├─────────────────────────────────────────────────────────────────────┤
│  Components:                                                         │
│  ├── LoginPage          ├── FindRoom        ├── Chat                │
│  ├── Dashboard          ├── FindRoommate    ├── Checklist           │
│  ├── Sidebar            ├── CostSplit       └── AddProperty         │
│  └── TenantOverview                                                  │
│                                                                      │
│  API Service Layer (api.js):                                        │
│  ├── login()            ├── getProperties()  ├── getChats()         │
│  ├── logout()           ├── createProperty() └── sendMessage()      │
│  └── getCurrentUser()   └── getRoommates()                          │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ fetch() with credentials
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    DJANGO BACKEND                                    │
│                  (localhost:8000/api)                                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │              MIDDLEWARE LAYER                                 │  │
│  │  ├── CORS Headers (django-cors-headers)                      │  │
│  │  ├── Session Authentication                                  │  │
│  │  ├── CSRF Protection                                         │  │
│  │  └── Security Middleware                                     │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                             │                                        │
│                             ▼                                        │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │              URL ROUTING (urls.py)                           │  │
│  │  ├── /api/auth/*        → users.urls                        │  │
│  │  ├── /api/properties/*  → properties.urls                   │  │
│  │  ├── /api/roommates/*   → properties.urls                   │  │
│  │  └── /api/chats/*       → chat.urls                         │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                             │                                        │
│                             ▼                                        │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │              DJANGO APPS                                      │  │
│  │                                                               │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │  │
│  │  │   USERS     │  │ PROPERTIES  │  │    CHAT     │         │  │
│  │  ├─────────────┤  ├─────────────┤  ├─────────────┤         │  │
│  │  │ Models:     │  │ Models:     │  │ Models:     │         │  │
│  │  │ - User      │  │ - Property  │  │ - Chat      │         │  │
│  │  │             │  │ - Roommate  │  │ - Message   │         │  │
│  │  │             │  │             │  │             │         │  │
│  │  │ Views:      │  │ Views:      │  │ Views:      │         │  │
│  │  │ - login     │  │ - PropertyVS│  │ - ChatVS    │         │  │
│  │  │ - logout    │  │ - RoommateVS│  │ - MessageVS │         │  │
│  │  │ - current   │  │             │  │             │         │  │
│  │  │             │  │             │  │             │         │  │
│  │  │ Serializers │  │ Serializers │  │ Serializers │         │  │
│  │  │ - UserSer   │  │ - PropertyS │  │ - ChatSer   │         │  │
│  │  │ - LoginSer  │  │ - RoommateS │  │ - MessageS  │         │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘         │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                             │                                        │
│                             ▼                                        │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │         DJANGO ORM (Object-Relational Mapping)               │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                             │                                        │
└─────────────────────────────┼────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      DATABASE LAYER                                  │
│                    SQLite (db.sqlite3)                               │
├─────────────────────────────────────────────────────────────────────┤
│  Tables:                                                             │
│  ├── users_user          (4 demo users)                             │
│  ├── properties_property (3 sample properties)                      │
│  ├── properties_roommate (1 roommate profile)                       │
│  ├── chat_chat           (chat rooms)                               │
│  └── chat_message        (messages)                                 │
└─────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════
                        DATA FLOW EXAMPLE
═══════════════════════════════════════════════════════════════════════

1. USER LOGIN FLOW:
   ┌──────┐  email/pass   ┌──────────┐  POST /api/auth/login/  ┌────────┐
   │ User │ ────────────> │ React    │ ─────────────────────> │ Django │
   └──────┘               │ Frontend │                         │ Backend│
                          └──────────┘ <───────────────────── └────────┘
                                         user data + session
                                         
2. FETCH PROPERTIES FLOW:
   ┌──────┐  click "Find  ┌──────────┐  GET /api/properties/  ┌────────┐
   │ User │   Room"       │ React    │ ─────────────────────> │ Django │
   └──────┘ ────────────> │ Frontend │                         │ Backend│
                          └──────────┘ <───────────────────── └────────┘
                                         JSON array of properties
                                         
3. CREATE PROPERTY FLOW:
   ┌──────┐  fill form    ┌──────────┐  POST /api/properties/ ┌────────┐
   │ User │  & submit     │ React    │ ─────────────────────> │ Django │
   └──────┘ ────────────> │ Frontend │  (with property data)   │ Backend│
                          └──────────┘ <───────────────────── └────────┘
                                         created property JSON


═══════════════════════════════════════════════════════════════════════
                        AUTHENTICATION FLOW
═══════════════════════════════════════════════════════════════════════

┌─────────┐                                              ┌─────────┐
│ Browser │                                              │ Django  │
│         │                                              │ Backend │
└────┬────┘                                              └────┬────┘
     │                                                        │
     │  1. POST /api/auth/login/                             │
     │     {email, password}                                 │
     ├──────────────────────────────────────────────────────>│
     │                                                        │
     │                                    2. Verify password  │
     │                                       Check database   │
     │                                                        │
     │  3. Set session cookie                                │
     │     Return user data                                  │
     │<──────────────────────────────────────────────────────┤
     │                                                        │
     │  4. Store user in React state                         │
     │     Redirect to dashboard                             │
     │                                                        │
     │  5. Subsequent requests include                       │
     │     session cookie automatically                      │
     ├──────────────────────────────────────────────────────>│
     │                                                        │
     │  6. Django verifies session                           │
     │     Returns requested data                            │
     │<──────────────────────────────────────────────────────┤
     │                                                        │


═══════════════════════════════════════════════════════════════════════
                        TECHNOLOGY STACK
═══════════════════════════════════════════════════════════════════════

Frontend:
├── React 18              (UI Framework)
├── Vite                  (Build Tool)
├── Tailwind CSS          (Styling)
├── React Router          (Navigation)
└── Fetch API             (HTTP Requests)

Backend:
├── Django 6.0            (Web Framework)
├── Django REST Framework (API Framework)
├── django-cors-headers   (CORS Support)
├── SQLite                (Database - Dev)
└── Python 3.8+           (Language)

Development Tools:
├── npm                   (Package Manager)
├── pip                   (Python Package Manager)
├── Git                   (Version Control)
└── VS Code               (IDE)


═══════════════════════════════════════════════════════════════════════
                        SECURITY LAYERS
═══════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────┐
│ 1. CORS Protection                                                   │
│    Only allows requests from localhost:3000 and localhost:5173      │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 2. CSRF Protection                                                   │
│    Django validates CSRF tokens on state-changing requests          │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 3. Session Authentication                                            │
│    Secure session cookies for user authentication                   │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 4. Password Hashing                                                  │
│    Django's PBKDF2 algorithm with SHA256 hash                       │
└─────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 5. SQL Injection Protection                                          │
│    Django ORM automatically escapes queries                          │
└─────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════
                        DEPLOYMENT ARCHITECTURE
═══════════════════════════════════════════════════════════════════════

Production Setup:

┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Vercel    │         │   Railway   │         │ PostgreSQL  │
│  (Frontend) │ ◄─────► │  (Backend)  │ ◄─────► │  Database   │
│             │  HTTPS  │             │         │             │
└─────────────┘         └─────────────┘         └─────────────┘
      │                       │
      │                       │
      ▼                       ▼
┌─────────────┐         ┌─────────────┐
│  Cloudflare │         │   AWS S3    │
│     CDN     │         │   (Media)   │
└─────────────┘         └─────────────┘

```

## 📊 Database Schema

```
users_user
├── id (PK)
├── username
├── email
├── password (hashed)
├── first_name
├── last_name
├── role (tenant/owner/agent/admin)
├── avatar
├── city
└── phone

properties_property
├── id (PK)
├── owner_id (FK → users_user)
├── title
├── location
├── rent
├── property_type
├── furnished
├── gender
├── verified
├── scam_risk
├── compatibility
├── rooms
├── bathrooms
├── amenities (JSON)
├── deposit
└── description

properties_roommate
├── id (PK)
├── user_id (FK → users_user)
├── age
├── profession
├── compatibility
├── sleep
├── cleanliness
├── food
├── guests
├── work_type
├── budget
└── verified

chat_chat
├── id (PK)
├── created_at
└── updated_at

chat_message
├── id (PK)
├── chat_id (FK → chat_chat)
├── sender_id (FK → users_user)
├── text
├── created_at
└── is_read
```

---

**This architecture provides:**
- ✅ Separation of concerns
- ✅ RESTful API design
- ✅ Secure authentication
- ✅ Scalable structure
- ✅ Easy to maintain
- ✅ Production-ready foundation
