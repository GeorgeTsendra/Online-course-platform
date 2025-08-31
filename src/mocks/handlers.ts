import { http, HttpResponse, delay } from "msw";
import { Course } from "../types/CoursesTypes";

type User = { id: string; email: string; name: string; token: string };
type LoginBody = { email: string; password: string };
type RegisterBody = { email: string; password: string; name?: string };
type PurchaseBody = { courseId: string };

const FAKE_DB = {
  users: new Map<string, User>(),
  purchasedByUser: new Map<string, Set<string>>(), // userId -> set of courseIds
  courses: [] as Course[],
};

const seedUser: User = {
  id: "u_1",
  email: "demo@example.com",
  name: "Demo User",
  token: "demo-token",
};
FAKE_DB.users.set(seedUser.email, seedUser);
FAKE_DB.purchasedByUser.set(seedUser.id, new Set());

/** Seed courses */
FAKE_DB.courses = [
  {
    id: "c_101",
    title: "React Basics",
    description:
      "Learn the fundamentals of React: components, props, state, and hooks.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    price: 19.99,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800",
  },
  {
    id: "c_102",
    title: "Advanced TypeScript",
    description:
      "Master generics, utility types, advanced typing patterns and best practices.",
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    price: 29.99,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800",
  },
  {
    id: "c_103",
    title: "Node.js API with Express",
    description:
      "Build RESTful APIs with Node.js, Express, and middleware like JWT.",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    price: 24.99,
    thumbnailUrl:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800",
  },
];

function getUserByAuthHeader(request: Request): User | null {
  const auth = (request.headers.get("authorization") ?? "").replace(
    "Bearer ",
    ""
  );
  if (!auth) return null;
  return [...FAKE_DB.users.values()].find((u) => u.token === auth) ?? null;
}

export const handlers = [
  http.post("/api/register", async ({ request }) => {
    await delay(600);
    const body = (await request.json()) as RegisterBody;
    if (!body.email || !body.password) {
      return HttpResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }
    if (FAKE_DB.users.has(body.email)) {
      return HttpResponse.json(
        { message: "user has already exist" },
        { status: 409 }
      );
    }
    const user: User = {
      id: `u_${Date.now()}`,
      email: body.email,
      name: body.name ?? "User",
      token: `t_${crypto.randomUUID()}`,
    };
    FAKE_DB.users.set(body.email, user);
    FAKE_DB.purchasedByUser.set(user.id, new Set());
    return HttpResponse.json(user, { status: 201 });
  }),

  http.post("/api/login", async ({ request }) => {
    await delay(500);
    const { email, password } = (await request.json()) as LoginBody;
    if (!email || !password) {
      return HttpResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }
    const found = FAKE_DB.users.get(email);
    if (!found) {
      return HttpResponse.json(
        { message: "Incorrect credentials" },
        { status: 401 }
      );
    }

    return HttpResponse.json(found, { status: 200 });
  }),

  http.get("/api/courses", async () => {
    await delay(400);
    return HttpResponse.json({ courses: FAKE_DB.courses }, { status: 200 });
  }),

  // Buying at the rate
  http.post("/api/purchase", async ({ request }) => {
    await delay(800);
    const { courseId } = (await request.json()) as PurchaseBody;
    const user = getUserByAuthHeader(request);
    if (!user) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!courseId) {
      return HttpResponse.json(
        { message: "courseId is required" },
        { status: 400 }
      );
    }
    const set = FAKE_DB.purchasedByUser.get(user.id)!;
    if (set.has(courseId)) {
      return HttpResponse.json(
        { message: "Already purchased" },
        { status: 409 }
      );
    }
    set.add(courseId);
    return HttpResponse.json({ success: true, courseId }, { status: 200 });
  }),

  // List of purchased courses
  http.get("/api/purchased", async ({ request }) => {
    await delay(300);
    const user = getUserByAuthHeader(request);
    if (!user) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const set = FAKE_DB.purchasedByUser.get(user.id) ?? new Set();
    return HttpResponse.json({ courseIds: [...set] }, { status: 200 });
  }),
];
