import jobsData from "../../../data/jobs.json";

export function generateStaticParams() {
  return jobsData.map((job) => ({
    id: String(job.id),
  }));
}

function removeEmails(text = "", allowed = []) {
  if (!text) return "";
  const allowedSet = new Set(
    (Array.isArray(allowed) ? allowed : [allowed]).filter(Boolean)
  );
  return text.replace(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    (match) => (allowedSet.has(match) ? match : "[email removed]")
  );
}

export default function JobDetailPage({ params }) {
  const job = jobsData.find((j) => String(j.id) === params.id);

  if (!job) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Job not found</h1>
        <p className="mt-4 text-gray-600">The job you are looking for does not exist.</p>
      </div>
    );
  }

  let applyHref = null;
  let applyLabel = "Apply Now";
  let applyProps = {};

  // prefer explicit applyEmail, then external links
  if (job.applyEmail) {
    applyHref = `mailto:${job.applyEmail}`;
    applyLabel = "Apply via Email";
    applyProps = {}; // mailto doesn't need target/rel
  } else if (job.linkedin) {
    applyHref = job.linkedin;
    applyLabel = "Apply →";
    applyProps = { target: "_blank", rel: "noopener noreferrer" };
  } else if (job.naukri) {
    applyHref = job.naukri;
    applyLabel = "Apply →";
    applyProps = { target: "_blank", rel: "noopener noreferrer" };
  } else if (job.applyLink) {
    applyHref = job.applyLink;
    applyLabel = "Apply →";
    applyProps = { target: "_blank", rel: "noopener noreferrer" };
  }

  const showApplyNow = !!applyHref;
  // don't redact the main apply email (if present) so Apply via Email remains visible in description
  const cleanDescription = removeEmails(job.description || "", job.applyEmail || []);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-8 md:p-10">
        {/* Job Title */}
        <h1 className="text-3xl font-bold text-blue-800 mb-2">{job.title}</h1>

        {/* Company */}
        <div className="text-gray-900 font-bold mb-4 text-lg">{job.company}</div>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
          <span>📍 {job.location}</span>
          <span>💼 {job.workingModel}</span>
          <span>🕑 {job.experience}</span>
          <span>🗓️ Posted: {job.postedDate}</span>
        </div>

        {/* Job Description */}
        <div className="mb-8 text-gray-800 space-y-4">
          <span className="font-semibold text-gray-900 text-base">Job Description:</span>
          <p className="whitespace-pre-line text-gray-700 leading-relaxed">{cleanDescription}</p>
        </div>

        {/* Optional Additional Info */}
        {job.additionalInfo && (
          <div className="mt-4 mb-6 bg-gray-50 border-l-4 border-blue-600 p-4 rounded-md">
            <h2 className="text-lg font-semibold mb-2 text-gray-900">Additional Information</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{job.additionalInfo}</p>
          </div>
        )}

        {/* Qualifications */}
        {job.qualifications && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900">Required Qualification</h2>
            {Array.isArray(job.qualifications) ? (
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {job.qualifications.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700 whitespace-pre-line">{job.qualifications}</p>
            )}
          </div>
        )}

        {/* Certifications */}
        {job.certifications && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900">Certifications</h2>
            {Array.isArray(job.certifications) ? (
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {job.certifications.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">{job.certifications}</p>
            )}
          </div>
        )}

        {/* Responsibilities — render when provided in the job object */}
        {job.responsibilities && job.responsibilities.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900">Responsibilities</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {job.responsibilities.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Apply / External Link area — show email only on detail page as "Apply : email" */}
        <div className="mt-6">
          {job.applyEmail ? (
            <div className="text-sm">
              <a
                href={`mailto:${job.applyEmail}`}
                className="text-blue-600 font-semibold hover:underline"
              >
                Apply : {job.applyEmail}
              </a>
            </div>
          ) : job.applyLink ? (
            <a
              href={job.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800"
            >
              Apply →
            </a>
          ) : null}
        </div>
      </div>
    </main>
  );
}
