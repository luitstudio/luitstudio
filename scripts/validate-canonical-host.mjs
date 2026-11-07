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
}

if (failures.length > 0) {
  console.error("Canonical-host validation failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("Canonical-host validation passed for www, apex, production alias, and preview hosts.");
