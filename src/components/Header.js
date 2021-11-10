const Header = () => {
  return (
    <header>
      <div>
        <img
          src="https://res.cloudinary.com/dyj84szrx/image/upload/v1636546324/vinted/Vinted-logo_jym1qv.png"
          alt="logo"
        ></img>
      </div>
      <div></div>
      <div className="subscribe">
        <button>s'inscrire</button>
      </div>
      <div className="subscribe">
        <button> se connecter </button>
      </div>
      <div className="sellButton">
        <button> vends maintenant</button>
      </div>
    </header>
  );
};

export default Header;
