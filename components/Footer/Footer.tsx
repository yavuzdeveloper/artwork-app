export default function Footer() {
  return (
    <footer className="bg-black text-white text-center p-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
        <p className="flex items-center gap-1">
          &copy; {new Date().getFullYear()} Art Collection by{" "}
          <a
            href="https://www.linkedin.com/in/yavuztokus/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-300 flex items-center gap-1"
          >
            Yavuz Tokus
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="ml-1"
              data-testid="linkedin-icon"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11.5 20h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.787-1.75-1.755s.784-1.755 1.75-1.755 1.75.787 1.75 1.755-.784 1.755-1.75 1.755zm13 12.268h-3v-5.604c0-1.337-.025-3.059-1.866-3.059-1.868 0-2.154 1.46-2.154 2.964v5.699h-3v-11h2.884v1.5h.041c.402-.763 1.385-1.566 2.852-1.566 3.05 0 3.613 2.008 3.613 4.619v6.447z" />
            </svg>
          </a>
        </p>
        <div className="flex gap-4">
          <a
            href="https://github.com/yavuzdeveloper"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
            aria-label="GitHub"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 24 24"
              data-testid="github-icon"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.495.997.108-.775.418-1.305.76-1.605-2.665-.3-5.467-1.335-5.467-5.93 0-1.31.468-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.21 0 1.595-.015 2.88-.015 3.27 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
