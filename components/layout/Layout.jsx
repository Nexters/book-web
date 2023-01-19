import Navigation from "../common/Navigation";

const Layout = (props) => {
  return (
    <div>
      <div>{props.children}</div>
      <Navigation />
    </div>
  );
};

export default Layout;
