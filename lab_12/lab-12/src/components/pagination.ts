/**
 * Повертає частину масиву для вибраної сторінки.
 *
 * @param items - повний список елементів
 * @param page - номер поточної сторінки
 * @param itemsPerPage - кількість елементів на одній сторінці
 * @returns елементи, які треба показати на вибраній сторінці
 */

export function paginate<T>(
  items: T[],
  page: number,
  itemsPerPage: number,
): T[] {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return items.slice(startIndex, endIndex);
}

/**
 * Обчислює загальну кількість сторінок.
 *
 * @param itemsCount - загальна кількість елементів
 * @param itemsPerPage - кількість елементів на одній сторінці
 * @returns кількість сторінок
 */

export function getPagesCount(
  itemsCount: number,
  itemsPerPage: number,
): number {
  return Math.ceil(itemsCount / itemsPerPage);
}

/**
 * Відображає кнопки пагінації на сторінці.
 *
 * @param container - HTML-елемент, у який буде вставлена пагінація
 * @param currentPage - номер поточної сторінки
 * @param pagesCount - загальна кількість сторінок
 */

export function renderPagination(
  container: HTMLElement,
  currentPage: number,
  pagesCount: number,
): void {
  const visiblePages = Array.from(
    { length: Math.min(3, pagesCount) },
    (_, index) => index + 1,
  );

  const dotsMarkup =
    pagesCount > 3
      ? `<span class="pagination-dots">...</span>`
      : '';

  const lastButtonMarkup =
    pagesCount > 1
      ? `
        <button
          class="pagination-link"
          type="button"
          data-page="last"
        >
          Last
        </button>
      `
      : '';

  container.innerHTML = `
    <div class="pagination-list">
      ${visiblePages
        .map((page) => {
          const activeClass = page === currentPage ? 'pagination-link--active' : '';

          return `
            <button
              class="pagination-link ${activeClass}"
              type="button"
              data-page="${page}"
            >
              ${page}
            </button>
          `;
        })
        .join('')}

      ${dotsMarkup}
      ${lastButtonMarkup}
    </div>
  `;
}