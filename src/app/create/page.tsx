'use client';
import { AppDispatch, State } from '@/redux/store';
import Table from './table';
import TableWrapper from './tableWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardEvent, useCallback, useRef } from 'react';
import Link from 'next/link';
import { setTitle } from '@/redux/slices/table';
import { toPng } from 'html-to-image';

export default function Create() {
  const project = useSelector((state: State) => state.tableReducer);
  const dispatch = useDispatch<AppDispatch>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const preventKeyDownEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') e.preventDefault();
  };

  const handleResizeHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  const handleChange = (value: string) => {
    dispatch(setTitle({ title: value }));
    handleResizeHeight();
  };

  const handleButtonClick = useCallback(() => {
    if (printRef.current === null) return;

    toPng(printRef.current, { cacheBust: true, backgroundColor: '#FFF' })
      .then((dataUrl) => {
        const link = document.createElement('a');

        link.download = project.title ? project.title : '만다라트';
        link.href = dataUrl;
        link.click();
        link.remove();
      })
      .catch((err) => console.log(err));
  }, [project.title]);

  return (
    <div className="py-24">
      <div className="flex items-center mb-2">
        <textarea
          ref={textareaRef}
          rows={1}
          value={project.title}
          className="flex-1 px-4 pb-2 mr-10 text-3xl font-medium border-b-2 outline-none resize-none hover:border-gray-300 focus:border-gray-500"
          placeholder="만다라트 제목"
          spellCheck={false}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => preventKeyDownEnter(e)}
          maxLength={80}
        />
        <button
          type="button"
          onClick={handleButtonClick}
          className="text-white bg-gradient-90 from-indigo-300 via-purple-400 to-indigo-300 animate-bgGradient
            bg-[length:400%_400%] font-medium text-lg rounded-lg tracking-[0.25rem] indent-1 px-4 py-2
            brightness-100 hover:brightness-95 transition duration-300"
        >
          출력하기
        </button>
      </div>

      <div ref={printRef}>
        <TableWrapper>
          {project.tables.map((table, tIdx) => (
            <Table key={tIdx} tIdx={tIdx} isActive={table.isActive} elements={table.elements} />
          ))}
        </TableWrapper>

        <div className="relative w-full mt-2">
          <Link href="https://www.gink-ss.com" target="_blank">
            <button className="absolute right-0 inline-flex items-center justify-center p-px text-xs text-gray-700 shadow-md rounded-2xl group bg-gradient-to-br from-purple-300 to-indigo-500">
              <span className="px-2 py-1 transition-all duration-75 ease-in bg-white rounded-2xl group-hover:bg-slate-50">
                @ GINK-SS
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
