import { Component } from "react";

import './Pagination.scss';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    };

    return range;
};

export class Pagination extends Component {

    state = { currentPage: 1 };

    /**
   * Let's say we have 10 pages and we set pageNeighbours to 2
   * Given that the current page is 6
   * The pagination control will look like the following:
   *
   * (1) < {4 5} [6] {7 8} > (10)
   *
   * (x) => terminal pages: first and last page(always visible)
   * [x] => represents current page
   * {...x} => represents page neighbours
   */
    fetchPageNumbers = () => {
        const totalPages = 42;
        const currentPage = this.state.currentPage;
        const pageNeighbours = 2;
        /**
     * totalNumbers: the total page numbers to show on the control
     */
        const totalNumbers = (this.pageNeighbours * 2) + 3;

        const startPage = Math.max(2, currentPage - pageNeighbours);
        const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
        let pages = range(startPage, endPage);

        /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
        const hasLeftSpill = startPage > 2;
        const hasRightSpill = (totalPages - endPage) > 1;
        const spillOffset = totalNumbers - (pages.length + 1);

        switch (true) {
            // handle: (1) < {5 6} [7] {8 9} (10)
            case (hasLeftSpill && !hasRightSpill): {
                const extraPages = range(startPage - spillOffset, startPage - 1);
                pages = [LEFT_PAGE, ...extraPages, ...pages];
                break;
            };

            // handle: (1) {2 3} [4] {5 6} > (10)
            case (!hasLeftSpill && hasRightSpill): {
                const extraPages = range(endPage + 1, endPage + spillOffset);
                pages = [...pages, ...extraPages, RIGHT_PAGE];
                break;
            };

            // handle: (1) < {4 5} [6] {7 8} > (10)
            case (hasLeftSpill && hasRightSpill):
            default: {
                pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
                break;
            };
        };

        return [1, ...pages, totalPages];
    };

    render() {
        return (
            <ul className="pagination">
                <li className="pagination__item">
                    <a href="#" aria-label="Previos" className="pagination__item-link">
                        &laquo;
                    </a>
                </li>
                <li className="pagination__item">
                    <a href="#" aria-label="Next" className="pagination__item-link">
                        &raquo;
                    </a>
                </li>
            </ul>
        )
    }
}