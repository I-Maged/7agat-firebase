const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      <p className='footer-text'>Copyright &copy; {currentYear} by 7AGAT, LLC. All rights reserved.</p>
    </footer>
  )
}

export default Footer
