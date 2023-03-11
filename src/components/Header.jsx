import PropTypes from 'prop-types';
import { FiChevronLeft, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { useAuth } from '../hooks/useAuth';

import logomark from '../assets/josueapp-100.webp';

export function Header({ showLogoutButton = false, showBackButton = false }) {
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div className="h-14 lg:h-16" />
      <header className="fixed top-0 w-full bg-primary-900 h-14 lg:h-16 flex items-center justify-center gap-1">
        {showBackButton && (
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
            className="absolute hover:brightness-90 transition bg-primary-900 p-2 rounded-lg text-neutral-50 left-4"
          >
            <FiChevronLeft size={24} />
          </button>
        )}
        <span className="block text-neutral-50 text-xl lg:text-xl font-bold">
          JosueApp
        </span>
        <img
          src={logomark}
          alt="JosueApp"
          className="h-9 lg:h-11"
          draggable={false}
        />
        {showLogoutButton && (
          <button
            type="button"
            onClick={() => {
              auth.logout(navigate, () => {
                toast.error('Não foi possível fazer logout.');
              });
            }}
            className="absolute hover:brightness-90 transition bg-primary-900 p-2 rounded-lg text-neutral-50 right-4"
          >
            <FiLogOut size={24} />
          </button>
        )}
      </header>
      <ToastContainer
        position="top-right"
        theme="colored"
        style={{
          fontWeight: 'bold',
        }}
      />
    </>
  );
}

Header.propTypes = {
  showLogoutButton: PropTypes.bool,
  showBackButton: PropTypes.bool,
};
