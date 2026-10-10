import useReveal from "../hooks/useReveal";

function Reveal({ children, delay = 0, as: Tag = "div", className = "" }) {
  const { ref, visible } = useReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
      style={delay ? { "--reveal-delay": `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

export default Reveal;