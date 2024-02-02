import clsx from "clsx"; // for conditional styling
import Link from "next/link";
import "./styles.css";

export default function ProductsPage({ params }) {
  // from url query parameters, get requested Products Catgory Name and
  // pageNumber for  fetching paginated data of the
  // specificied  products catgory in url query parameters.
  //e.g in the url "/men/12" ,  categoryName = men and pageNumber = 12
  let [categoryName, pageNumber] = params.category;
  //convert pageNumber to number
  pageNumber = +pageNumber;
  // if pageNumber is not provided or less than 1, then set it to 1
  if (!pageNumber || pageNumber < 1) {
    pageNumber = 1;
  }

  // next url and previous url for navigation
  let previousPage = `/products/${categoryName}/${pageNumber - 1}`;
  let nextPage = `/products/${categoryName}/${pageNumber + 1}`;

  return (
    <main>
      You are viewing page number {pageNumber} for {categoryName}
      {/* previous page and next page buttons */}
      <div className="pages-navigation-buttons-container">
        {/* go to previous page button */}
        <Link
          href={previousPage}
          className={clsx("primary-btn", pageNumber <= 1 ? "hidden" : null)}
        >
          See Previous
        </Link>

        {/* go to next page btn */}
        <Link href={nextPage} className={clsx("primary-btn")}>
          See More
        </Link>
      </div>
    </main>
  );
}
