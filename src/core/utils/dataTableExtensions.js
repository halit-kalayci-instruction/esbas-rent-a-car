import { FilterMatchMode } from "primereact/api";

export const translateFilterToBackend = filterObject => {
    let filtersAsObject = Object.entries(filterObject.filters).map(i => {
        return { field: i[0], filter: i[1] };
    });
    let filtersToUse = filtersAsObject.filter(
        i =>
            (i.filter.constraints &&
                i.filter.constraints.some(c => c.value && c.value != null)) ||
            (i.filter.value && i.filter.value != null),
    );
    let firstFilter = filtersToUse[0];

    let parentFilter = getFilterObject(firstFilter.field, firstFilter.filter);

    filtersToUse.shift();

    for (const filter of filtersToUse) {
        if (filter.field == "global") continue;
        let obj = getFilterObject(filter.field, filter.filter);
        parentFilter.filters.push(obj);
    }
    return parentFilter;
};

const getFilterObject = (field, filter) => {
    if (
        filter.constraints &&
        filter.constraints.some(
            constraint => constraint.value && constraint.value != null,
        ) &&
        filter.constraints.length > 0
    ) {
        let obj = {
            field: field,
            logic: filter.operator,
            operator: filter.constraints[0].matchMode,
            value: filter.constraints[0].value,
            filters: [],
        };
        filter.constraints.shift();
        filter.constraints.forEach(constraint => {
            obj.filters.push({
                field: field,
                logic: filter.operator,
                operator: constraint.matchMode,
                value: constraint.value,
            });
        });

        return obj;
    } else {
        if (!filter.value || filter.value == null) return {};
        let obj2 = {};
        if (filter.matchMode == FilterMatchMode.BETWEEN) {
            obj2 = {
                field: field,
                operator: "gt",
                value: filter.value[0],
                logic: "and",
                filters: [{ field: field, operator: "lt", value: filter.value[1] }],
            };
            return obj2;
        } else {
            obj2 = {
                field: field,
                operator: filter.matchMode,
                value: filter.value,
            };
            return obj2;
        }
    }
};