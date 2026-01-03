"use client";

import React from 'react';

export function ClarkKitchenEmblem() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        .logo-container {
          display: flex;
          align-items: baseline;
          gap: 14px;
        }

        .clark {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 72px;
          color: #fff;
          letter-spacing: 3px;
          text-shadow:
            0 1px 0 #ccc,
            0 2px 0 #bbb,
            0 3px 0 #aaa,
            0 4px 0 #999,
            0 5px 0 #888,
            0 6px 4px rgba(0,0,0,0.4),
            0 8px 10px rgba(0,0,0,0.3);
        }

        .kitchen {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 72px;
          color: #ff3b3b;
          letter-spacing: 3px;
          text-shadow:
            0 1px 0 #cc2f2f,
            0 2px 0 #b82a2a,
            0 3px 0 #a32525,
            0 4px 0 #8f2020,
            0 5px 0 #7a1b1b,
            0 6px 4px rgba(0,0,0,0.5),
            0 8px 10px rgba(0,0,0,0.4),
            0 0 50px rgba(255, 59, 59, 0.5);
        }

        @media (max-width: 768px) {
          .clark, .kitchen {
            font-size: 48px;
          }
        }

        @media (max-width: 640px) {
          .clark, .kitchen {
            font-size: 36px;
          }
        }
      `}</style>

      <div className="logo-container">
        <span className="clark">Clark</span>
        <span className="kitchen">Kitchen</span>
      </div>
    </>
  );
}
