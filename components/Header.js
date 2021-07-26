function Header() {
  return (
    <div className="header">
      Blogify
      <style jsx>{`
        .header {
          width: 100%;
          padding: 1rem;
          background: purple;
          text-align: center;
          font-size: calc(1vw + 16px);
          font-weight: 600;
          color: white;
          font-family: monospace;
        }
      `}</style>
    </div>
  );
}

export default Header;
