import "server-only";

import { createPublicClient } from "@/lib/supabase/public";
import { createClient } from "@/lib/supabase/server";
import type {
  JobApplication,
  JobApplicationStatus,
  JobOpening,
  JobOpeningStatus,
} from "@/types/career";

interface JobOpeningRow {
  id: string;
  title: string;
  slug: string;
  department: string | null;
  employment_type: string;
  location: string;
  summary: string;
  description: string;
  responsibilities: string[] | null;
  requirements: string[] | null;
  status: JobOpeningStatus;
  created_at: string;
  updated_at: string;
}

interface JobApplicationRow {
  id: string;
  job_opening_id: string | null;
  full_name: string;
  email: string;
  role_interest: string | null;
  link_url: string | null;
  resume_url: string | null;
  message: string;
  status: JobApplicationStatus;
  created_at: string;
  job_openings: { title: string } | { title: string }[] | null;
}

const OPENING_COLUMNS =
  "id, title, slug, department, employment_type, location, summary, description, responsibilities, requirements, status, created_at, updated_at";

function mapOpeningRow(row: JobOpeningRow): JobOpening {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    department: row.department,
    employmentType: row.employment_type,
    location: row.location,
    summary: row.summary,
    description: row.description,
    responsibilities: row.responsibilities ?? [],
    requirements: row.requirements ?? [],
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// A role page can be indexed only when it provides enough independent job
// information to be useful beyond its application form. This also keeps thin
// draft-like postings out of the sitemap without removing them from the CMS.
export function isIndexableOpening(opening: JobOpening): boolean {
  return (
    opening.summary.trim().length >= 80 &&
    opening.description.trim().length >= 160 &&
    opening.responsibilities.length > 0 &&
    opening.requirements.length > 0
  );
}

function mapApplicationRow(row: JobApplicationRow): JobApplication {
  const joinedOpening = Array.isArray(row.job_openings)
    ? row.job_openings[0]
    : row.job_openings;

  return {
    id: row.id,
    jobOpeningId: row.job_opening_id,
    jobOpeningTitle: joinedOpening?.title ?? null,
    fullName: row.full_name,
    email: row.email,
    roleInterest: row.role_interest,
    linkUrl: row.link_url,
    resumeUrl: row.resume_url,
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
  };
}

export async function getPublishedOpenings(): Promise<JobOpening[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("job_openings")
    .select(OPENING_COLUMNS)
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return (data as JobOpeningRow[]).map(mapOpeningRow);
}

export async function getPublishedOpening(
  slug: string,
): Promise<JobOpening | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("job_openings")
    .select(OPENING_COLUMNS)
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) return null;
  return mapOpeningRow(data as JobOpeningRow);
}

export async function getOpeningForAdmin(
  id: string,
): Promise<JobOpening | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("job_openings")
    .select(OPENING_COLUMNS)
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return mapOpeningRow(data as JobOpeningRow);
}

export async function getAllOpeningsForAdmin(): Promise<JobOpening[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("job_openings")
    .select(OPENING_COLUMNS)
    .order("updated_at", { ascending: false });

  if (error || !data) return [];
  return (data as JobOpeningRow[]).map(mapOpeningRow);
}

export async function getAllApplicationsForAdmin(): Promise<
  JobApplication[]
> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("job_applications")
    .select(
      "id, job_opening_id, full_name, email, role_interest, link_url, resume_url, message, status, created_at, job_openings(title)",
    )
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return (data as unknown as JobApplicationRow[]).map(mapApplicationRow);
}

export async function getApplicationForAdmin(
  id: string,
): Promise<JobApplication | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("job_applications")
    .select(
      "id, job_opening_id, full_name, email, role_interest, link_url, resume_url, message, status, created_at, job_openings(title)",
    )
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return mapApplicationRow(data as unknown as JobApplicationRow);
}
