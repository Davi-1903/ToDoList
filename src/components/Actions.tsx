import { IconDownload, IconUpload } from '@tabler/icons-react';
import type { ActionsProps } from '../interfaces/Props';

export default function Actions({ pasteTasks, copyTasks }: ActionsProps) {
    return (
        <article className='fixed right-0 bottom-0 rounded-tl-2xl bg-secund-100 p-4 print:hidden'>
            <div className='absolute -top-4 right-0 aspect-square h-4 bg-secund-100 mask-radial-from-transparent mask-radial-from-4 mask-radial-to-black mask-radial-to-4 mask-radial-at-top-left'></div>
            <div className='absolute bottom-0 -left-4 aspect-square h-4 bg-secund-100 mask-radial-from-transparent mask-radial-from-4 mask-radial-to-black mask-radial-to-4 mask-radial-at-top-left'></div>
            <button className='btn mb-4 block aspect-square p-4' onClick={pasteTasks} title='Paste tasks'>
                <IconUpload />
            </button>
            <button className='btn block aspect-square p-4' onClick={copyTasks} title='Copy tasks'>
                <IconDownload />
            </button>
        </article>
    );
}
