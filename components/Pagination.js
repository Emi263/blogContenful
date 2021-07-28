import { useState } from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const removeActive = (e) => {
    document.querySelectorAll("a").forEach((a) => {
      a.classList.remove("active");
      e.target.classList.add("active");
    });
  };
  const [active, setActive] = useState(false);
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={(e) => {
                paginate(number);

                removeActive(e);
              }}
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>

      <style jsx>{`
        ul.pagination {
          max-width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }
        .page-item {
          list-style-type: none;
        }
        .page-link {
          display: inline-block;
          padding: 0.3rem 0.6rem;
          background: blue;
          color: white;
          cursor: pointer;
        }

        .active {
          background: purple;
        }
      `}</style>
    </nav>
  );
};
export default Pagination;
