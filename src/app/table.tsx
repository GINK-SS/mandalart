import { ElementState } from '@/redux/slices/table';
import Textarea from './textarea';

type TableProps = {
  elements: ElementState[];
};

export default function Table({ elements }: TableProps) {
  const style = {
    trStyle: 'flex',
    tdStyle: 'flex items-center justify-center p-0 border',
  };
  return (
    <table className="border-0 border-gray-500">
      <tbody>
        <tr className={style.trStyle}>
          <td className={style.tdStyle}>
            <Textarea placeholder={elements[0]?.placeholder} />
          </td>
          <td className={style.tdStyle}>
            <Textarea placeholder={elements[1]?.placeholder} />
          </td>
          <td className={style.tdStyle}>
            <Textarea placeholder={elements[2]?.placeholder} />
          </td>
        </tr>
        <tr className={style.trStyle}>
          <td className={style.tdStyle}>
            <Textarea placeholder={elements[3]?.placeholder} />
          </td>
          <td className={style.tdStyle}>
            <Textarea placeholder={elements[4]?.placeholder} />
          </td>
          <td className={style.tdStyle}>
            <Textarea placeholder={elements[5]?.placeholder} />
          </td>
        </tr>
        <tr className={style.trStyle}>
          <td className={style.tdStyle}>
            <Textarea placeholder={elements[6]?.placeholder} />
          </td>
          <td className={style.tdStyle}>
            <Textarea placeholder={elements[7]?.placeholder} />
          </td>
          <td className={style.tdStyle}>
            <Textarea placeholder={elements[8]?.placeholder} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}