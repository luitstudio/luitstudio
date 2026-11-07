const baseUrl = process.env.REDIRECT_TEST_BASE_URL ?? "http://127.0.0.1:3000";
const cases = [
  {
    name: "www homepage",
    path: "/",
    host: "www.luitstudio.com",
    expectedStatus: 308,
    expectedLocation: "https://luitstudio.com/",
  },
  {
    name: "www nested route",
    path: "/services",
    host: "www.luitstudio.com",
    expectedStatus: 308,
    expectedLocation: "https://luitstudio.com/services",
  },
  {
    name: "www query parameters",
    path: "/contact?source=seo&campaign=phase-2",
    host: "www.luitstudio.com",
    expectedStatus: 308,
    expectedLocation: "https://luitstudio.com/contact?source=seo&campaign=phase-2",
  },
  {
    name: "legacy internship route",
    path: "/internship",
    host: "luitstudio.com",
    expectedStatus: 308,
    expectedLocation: "https://luitstudio.com/career",
  },
  {
    name: "legacy internship trailing slash",
    path: "/internship/",
    host: "luitstudio.com",
    expectedStatus: 308,
    expectedLocation: "https://luitstudio.com/career",
  },
  {
    name: "legacy internship query parameters",
    path: "/internship?source=google",
    host: "luitstudio.com",
    expectedStatus: 308,
    expectedLocation: "https://luitstudio.com/career?source=google",
  },
  {
    name: "www legacy internship first hop",
    path: "/internship",
    host: "www.luitstudio.com",
    expectedStatus: 308,
    expectedLocation: "https://luitstudio.com/internship",
    expectedFinalLocation: "https://luitstudio.com/career",
  },
  {
    name: "apex homepage",
    path: "/",
    host: "luitstudio.com",
    expectedStatus: 200,
  },
  {
    name: "Vercel production alias",
    path: "/",
    host: "luitstudio-iota.vercel.app",
    expectedStatus: 200,
  },
  {
    name: "Vercel preview hostname",
    path: "/",
    host: "luitstudio-git-redirect-test-luit-studio.vercel.app",
    expectedStatus: 200,
  },
];

const failures = [];

for (const testCase of cases) {
  const response = await fetch(`${baseUrl}${testCase.path}`, {
    headers: {
      host: testCase.host,
      "x-forwarded-host": testCase.host,
    },
    redirect: "manual",
  });
  const location = response.headers.get("location");

  if (response.status !== testCase.expectedStatus) {
    failures.push(`${testCase.name}: expected ${testCase.expectedStatus}, received ${response.status}`);
  }
  if (testCase.expectedLocation && location !== testCase.expectedLocation) {
    failures.push(`${testCase.name}: expected Location ${testCase.expectedLocation}, received ${location ?? "missing"}`);
  }
  if (testCase.expectedFinalLocation && location) {
    const nextUrl = new URL(location);
    const followUp = await fetch(`${baseUrl}${nextUrl.pathname}${nextUrl.search}`, {
      headers: {
        host: nextUrl.host,
        "x-forwarded-host": nextUrl.host,
      },
      redirect: "manual",
    });
    const finalLocation = followUp.headers.get("location");
    if (followUp.status !== 308 || finalLocation !== testCase.expectedFinalLocation) {
      failures.push(`${testCase.name}: expected final Location ${testCase.expectedFinalLocation}, received ${finalLocation ?? "missing"}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Canonical-host validation failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("Canonical-host validation passed for www, apex, production alias, and preview hosts.");
