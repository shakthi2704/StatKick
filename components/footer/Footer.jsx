import React from "react"

const Footer = () => {
  return (
    <footer className="bg-background text-foreground py-2">
      {/* Copyright & Disclaimer */}
      <div className="flex justify-between items-center mt-6 border-t border-gray-700 pt-2">
        <div className="flex flex-col">
          <p className="text-xs">
            Fixtures & results sourced from verified providers.{" "}
            <a href="https://www.api-football.com/" className="underline">
              RapidApi
            </a>
          </p>
        </div>
        <div className="text-right text-xs">
          <p>© 2025 Football Dashboard. All rights reserved.</p>
          <p className="text-xs">
            This site is not affiliated with FIFA, UEFA, or any official
            football organization.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
