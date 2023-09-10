import { FC } from "react";
import { TBox, BoxContent, BoxChildren } from './types';

const Box: FC<TBox> = (args) => {
    const Icon = args.icon;
    const content = args.content as BoxContent;
    const contentChildren = (args.content as BoxChildren).children;

    return (
        <>
        {((content.main && content.note) || contentChildren) && <div className='w-[100%] p-4 rounded-lg flex flex-col gap-3 md:p-6' style={{ backgroundColor: args.backgroundColor }}>
            {(Icon || args.title) && (
                <div className='flex items-center gap-1 mb-2'>
                    {Icon && <Icon size="1rem" color="#F0F0F0" />}
                    {args.title && <p className="text-xs font-bold text-bright">{args.title}</p>}
                </div>
            )}
            {content.main && content.note ? (
                <>
                    <p className='text-[1.75rem] text-bright'>{content.main}°</p>
                    <p className="text-bright">{content.note}</p>
                </>
            ) : contentChildren}
        </div>}
        </>
    );
};

export default Box;