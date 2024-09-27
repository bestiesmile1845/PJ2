
import React from "react";
import "../App.css";

const SideText: React.FC = () => {
    return (
        <div>
            <div className="absolute  overflow-hidden bottom-0 w-full font-bold italic text-center bg-use text-black text-xl py-2 uppercase ">
                <div className="whitespace-nowrap animate-marquee">
                    <span>
                        * Wake up. Work out. Look hot. Kick ass. * Wake up. Work out. Look hot. Kick ass. * Wake up. Work out. Look hot.
                        Kick ass. * Wake up. Work out. Look hot. Kick ass. * Wake up. Work out. Look hot. Kick ass. * Wake up. Work out.
                        Look hot. Kick ass. * Wake up. Work out. Look hot. Kick ass. * Wake up. Work out. Look hot. Kick ass.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SideText;
