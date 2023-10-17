const Container = ({ children }) => {
  return (
    <div className="row">
      <div className="ds-col-3"></div>
      <div className="ds-col-6">{children}</div>
      <div className="ds-col-3"></div>
    </div>
  );
};

export default Container;
