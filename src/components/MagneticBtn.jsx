import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

const MagneticBtn = ({ children, className, href, to }) => {
  const btnRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const onMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.6,
        ease: "power3.out"
      });
    };

    const onMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)"
      });
    };

    btn.addEventListener('mousemove', onMouseMove);
    btn.addEventListener('mouseleave', onMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', onMouseMove);
      btn.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  // Internal link (React Router)
  if (to) {
    return (
      <Link to={to} ref={btnRef} className={`btn-magnetic ${className}`}>
        <span className="flex items-center gap-2">{children}</span>
      </Link>
    );
  }

  // External/anchor link
  if (href) {
    return (
      <a href={href} ref={btnRef} className={`btn-magnetic ${className}`}>
        <span className="flex items-center gap-2">{children}</span>
      </a>
    );
  }

  return (
    <button ref={btnRef} className={`btn-magnetic ${className}`}>
      <span className="flex items-center gap-2">{children}</span>
    </button>
  );
};

export default MagneticBtn;
