"use client";

import CustomInputComponent from "@/components/custom-input-component";
import CustomCheckboxItem from "@/components/custom-checkbox";
import CustomTable, { TableColumn, TableRow } from "@/components/custom-table";
import FinancialsService from "@/api/financials";
import type { IReportDefinition } from "@/interfaces/financials.interface";
import ToastService from "@/utils/toast-service";
import {
  Button,
  Header,
  Label,
  ListBox,
  Select,
  Separator,
  Spinner,
} from "@heroui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { AiOutlineExport } from "react-icons/ai";

const PAGE_SIZE = 10;

function ReportsView() {
  const { data: reports = [] } = useQuery({
    queryKey: ["financials", "reports"],
    queryFn: FinancialsService.fetchReports,
  });
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
  const [optionalSelectedColumns, setOptionalSelectedColumns] = useState<
    Record<string, boolean>
  >({});
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [previewPage, setPreviewPage] = useState(1);
  const resolvedReportId = selectedReportId ?? reports[0]?.reportId ?? null;

  const selectedReport = useMemo(
    () => reports.find((r) => r.reportId === resolvedReportId) ?? null,
    [reports, resolvedReportId],
  );

  const executeMutation = useMutation({
    mutationKey: ["financials", "execute-report"],
    mutationFn: (payload: {
      reportId: number;
      filters: Record<string, string | number>;
    }) => FinancialsService.executeReport(payload.reportId, payload.filters),
  });

  const previewRows = useMemo(
    () => executeMutation.data?.data ?? [],
    [executeMutation.data?.data],
  );

  const visibleColumns = useMemo(() => {
    if (!selectedReport) return [];
    return selectedReport.schema.columns.filter(
      (col) => col.required || optionalSelectedColumns[col.key],
    );
  }, [optionalSelectedColumns, selectedReport]);

  const pagedRows = useMemo(() => {
    const start = (previewPage - 1) * PAGE_SIZE;
    return previewRows.slice(start, start + PAGE_SIZE);
  }, [previewRows, previewPage]);

  const tableColumns: TableColumn[] = useMemo(
    () => visibleColumns.map((col) => ({ key: col.key, label: col.label })),
    [visibleColumns],
  );

  const tableData: TableRow[] = useMemo(
    () =>
      pagedRows.map((row) =>
        Object.fromEntries(
          visibleColumns.map((col) => [col.key, String(row[col.key] ?? "")]),
        ),
      ),
    [pagedRows, visibleColumns],
  );

  const previewPagination = {
    pageNumber: previewPage,
    pageSize: PAGE_SIZE,
    totalCount: previewRows.length,
  };

  const groupedReports = useMemo(() => {
    const groups = new Map<string, IReportDefinition[]>();
    for (const report of reports) {
      const category = report.schema.category || "General";
      const current = groups.get(category) ?? [];
      current.push(report);
      groups.set(category, current);
    }
    return Array.from(groups.entries()).map(([key, values]) => ({
      key,
      values,
    }));
  }, [reports]);

  const onDownloadCsv = () => {
    if (!previewRows.length || !visibleColumns.length) return;

    const escape = (val: unknown) => {
      const str = String(val ?? "");
      return str.includes(",") || str.includes('"') || str.includes("\n")
        ? `"${str.replace(/"/g, '""')}"`
        : str;
    };

    const header = visibleColumns.map((c) => escape(c.label)).join(",");
    const rows = previewRows
      .map((row) => visibleColumns.map((c) => escape(row[c.key])).join(","))
      .join("\n");

    const blob = new Blob([`${header}\n${rows}`], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${executeMutation.data?.report_name ?? "report"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onGenerate = async () => {
    if (!selectedReport) return;

    const required = selectedReport.schema.filters.filter((f) => f.required);
    for (const req of required) {
      const val = filters[req.key]?.trim();
      if (!val) {
        ToastService.error({ text: `${req.label} is required.` });
        return;
      }
    }

    const payload: Record<string, string | number> = {};
    Object.entries(filters).forEach(([k, v]) => {
      const trimmed = v.trim();
      if (trimmed) payload[k] = trimmed;
    });

    try {
      const result = await executeMutation.mutateAsync({
        reportId: selectedReport.reportId,
        filters: payload,
      });
      setPreviewPage(1);
      if (!result.status) {
        ToastService.error({
          text: result.message || "Report execution failed",
        });
      }
    } catch (error) {
      ToastService.error({
        text:
          error instanceof Error ? error.message : "Report execution failed",
      });
    }
  };

  return (
    <div className="flex flex-col px-7 pb-3 pt-5 space-y-3 md:h-full md:overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:flex-1 md:min-h-0 md:overflow-hidden">
        {/* Left panel — filters + checkboxes */}
        <div className="flex flex-col space-y-4 w-full md:h-full md:min-h-0">
          <span className="text-sm md:text-lg font-gotham-black uppercase shrink-0">
            REPORTS
          </span>
          <div className="shrink-0">
            <ReportsSelection
              reports={groupedReports}
              onSelected={(val) => {
                setSelectedReportId(val.reportId);
                setOptionalSelectedColumns({});
                setFilters({});
                setPreviewPage(1);
              }}
              selectedValue={selectedReport}
            />
          </div>
          <div className="rounded-sm border-[1.5px] p-5 h-[500px] md:flex-1 flex flex-col min-h-0 bg-white">
            <span className="text-xs font-gotham-bold shrink-0 mb-4">
              {selectedReport?.schema.category ?? "General"}
            </span>
            <div className="flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar overscroll-contain">
              <div className="mb-5 shrink-0 space-y-3">
                {(selectedReport?.schema.filters ?? []).map((filter) => {
                  if (filter.type === "date") {
                    return (
                      <div key={filter.key} className="max-w-[220px]">
                        <Label className="text-xs">{filter.label}</Label>
                        <input
                          type="date"
                          value={filters[filter.key] ?? ""}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              [filter.key]: e.target.value,
                            }))
                          }
                          className="mt-2 w-full border rounded-sm border-gray-300 px-3 py-2 text-xs"
                        />
                      </div>
                    );
                  }

                  return (
                    <CustomInputComponent
                      key={filter.key}
                      className="max-w-[220px] p-0 border border-gray-400 rounded-sm"
                      label={filter.label}
                      placeholder={`Input ${filter.label}`}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          [filter.key]: e.target.value,
                        }))
                      }
                    />
                  );
                })}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
                {(selectedReport?.schema.columns ?? []).map((column) => (
                  <CustomCheckboxItem
                    key={column.key}
                    selected={
                      column.required || optionalSelectedColumns[column.key]
                    }
                    label={column.label}
                    labelClassName="font-gotham-regular"
                    isDisabled={column.required}
                    setIsSelected={(checked) =>
                      setOptionalSelectedColumns((prev) => ({
                        ...prev,
                        [column.key]: Boolean(checked),
                      }))
                    }
                  />
                ))}
              </div>
            </div>

            <Button
              className="mt-5 w-full rounded-sm bg-[#f6a21f] text-white font-gotham-black text-xs py-6 shrink-0"
              isDisabled={!selectedReport || executeMutation.isPending}
              onClick={onGenerate}
              isPending={executeMutation.isPending}
            >
              {({ isPending }) => (
                <>
                  {isPending ? (
                    <>
                      <Spinner color="current" size="sm" />
                      {"GENERATE REPORT"}
                    </>
                  ) : (
                    "GENERATE REPORT"
                  )}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Right panel — preview */}
        <div className="min-h-[480px] md:h-full md:min-h-0 rounded-sm bg-gray-100 overflow-hidden flex flex-col">
          <div className="p-4 border-gray-200 shrink-0 flex justify-between items-center">
            <span className="text-xs font-gotham-bold text-black">Preview</span>
            <Button
              className="rounded-sm bg-[#f6a21f] text-white"
              size="md"
              isDisabled={!previewRows.length}
              onClick={onDownloadCsv}
            >
              <AiOutlineExport className="w-3.5 h-3.5" />
              <span className="text-xs font-gotham-bold">Export Data</span>
            </Button>
          </div>
          <Separator className="text-black bg-[#f6a21f]/30" />
          <div className="bg-white m-5 flex-1 min-h-0 flex flex-col overflow-hidden">
            {!executeMutation.data ? (
              <div className="text-sm font-gotham-black p-5">
                Generate a report to preview data
              </div>
            ) : (
              <>
                <div className="text-sm font-gotham-bold px-1 pt-1 pb-3 shrink-0">
                  {executeMutation.data.report_name}
                  <span className="font-gotham-regular text-xs">{` / ${previewRows.length.toLocaleString("en-GH")} records`}</span>
                </div>
                {tableColumns.length > 0 ? (
                  <div className="flex-1 min-h-0 overflow-hidden">
                    <CustomTable
                      columns={tableColumns}
                      data={tableData}
                      pagination={previewPagination}
                      pageSize={PAGE_SIZE}
                      onPageChange={setPreviewPage}
                      loading={false}
                      isRefetching={false}
                    />
                  </div>
                ) : (
                  <div className="text-xs text-gray-400 p-1">
                    Select at least one column to preview.
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsView;

type Props = {
  reports: Array<{ key: string; values: IReportDefinition[] }>;
  onSelected: (value: IReportDefinition) => void;
  selectedValue: IReportDefinition | null;
};

const ReportsSelection = ({ reports, onSelected, selectedValue }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = selectedValue?.name ?? "";

  function handleAction(payload: IReportDefinition) {
    setIsOpen(false);
    onSelected(payload);
  }

  return (
    <Select
      placeholder="Select a Report"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    >
      <Label className="text-xs font-gotham-bold text-gray-500">
        Select a Report
      </Label>
      <Select.Trigger
        className="border border-gray-200 shadow-none rounded-sm bg-white hover:border-gray-400 transition-colors w-full"
        onClick={() => setIsOpen(true)}
      >
        <Select.Value className="text-xs">
          {selectedLabel || "Select a Report"}
        </Select.Value>
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover className="rounded-sm">
        <ListBox>
          {reports.map((section, sIndex) => (
            <ListBox.Section key={section.key}>
              <Header className="px-4 py-2 text-[10px] font-gotham-medium text-gray-400 uppercase tracking-wider">
                {section.key}
              </Header>
              {section.values.map((report) => (
                <ListBox.Item
                  key={report.reportId}
                  id={report.name.toLowerCase().replace(/\s+/g, "-")}
                  textValue={report.name}
                  onAction={() => handleAction(report)}
                  className="flex items-center px-4 py-2 text-xs rounded-sm cursor-pointer hover:bg-gray-200/50 outline-none transition-colors"
                >
                  <div className="flex items-center gap-3 w-full">
                    <span className="flex-1 truncate group-selected:font-gotham-medium">
                      {report.name}
                    </span>
                  </div>
                </ListBox.Item>
              ))}
              {sIndex < reports.length - 1 && (
                <div className="h-px bg-gray-500/30 my-1 mx-2" />
              )}
            </ListBox.Section>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
};
