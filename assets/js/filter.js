$(document).ready(function() {
    // 1. Handle clicks on navigation items (specifically targeting select dropdowns)
    $('.nav-select').on('change', function() {
        const selectedValue = $(this).val();
        const selectedText = $(this).find('option:selected').text();

        // Avoid adding empty or default values
        if (selectedValue && selectedText !== 'Select Category' && selectedText !== 'Select Price' && selectedText !== 'Select Rating' && selectedText !== 'Sort by: latest' && selectedText !== 'Show 16') {
            addFilter(selectedText);
        }
    });

    // 2. Add filter pill to the filter-options area
    function addFilter(text) {
        // Clear the default "Active Filter" text if it's there
        if ($('.filter-options').find('p').length > 0) {
            $('.filter-options').empty();
        }

        const filterPill = `
            <div class="filter-pill">
                <span>${text}</span>
                <button class="remove-filter">×</button>
            </div>
        `;
        $('.filter-options').append(filterPill);
    }

    // 3. Handle click to remove a filter pill
    $('.filter-options').on('click', '.remove-filter', function() {
        $(this).parent('.filter-pill').remove();

        // If no filters are left, show the default text
        if ($('.filter-options').children().length === 0) {
            $('.filter-options').html('<p class="text-secondary align-items-center align-content-center m-0 p-0">Active Filter</p>');
        }
    });

    // 4. Add some basic styling for the new filter pills
    const styles = `
        .filter-options {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .filter-pill {
            display: flex;
            align-items: center;
            background-color: #e9ecef;
            border: 1px solid #ced4da;
            border-radius: 20px;
            padding: 5px 10px;
            font-size: 14px;
        }
        .filter-pill span {
            margin-right: 10px;
        }
        .remove-filter {
            border: none;
            background: none;
            font-size: 16px;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
    `;
    $('head').append(`<style>${styles}</style>`);

    // 5. Handle category filtering
    $('input[name="category"]').on('change', function() {
        const selectedCategory = $(this).attr('id');

        $('.products-grid .col-xl-3').each(function() {
            const productCategory = $(this).data('category');

            if (selectedCategory === 'all' || selectedCategory === productCategory) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});