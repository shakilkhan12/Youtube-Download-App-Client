'use client'

const Footer = () => {
  return (
    <footer className="border-t">
        <div className="max-w-screen-xl px-4 flex items-center h-20 mx-auto">
            <p>
                &copy; Copyright {new Date().getFullYear()}. All rights reserved
            </p>
        </div>
    </footer>
  )
}

export default Footer