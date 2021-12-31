import React, { useEffect, useState } from "react";
import './App.css';

function TableRow(props) {
    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full"
                             src={props.imgsrc}/>
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                            {props.name}
                        </div>
                        <div className="text-sm text-gray-500">
                            {props.email}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                { props.category }
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {props.info}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">

                        <div>
                {
                    props.status === "Verified" ? (
                    <span
                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                {props.status}
                    </span>
                    ) : (
                    <span
                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                {props.status}
                    </span>
                    )
                }
                    </div>

            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900">
                        {props.donate}
                    </button>
            </td>
        </tr>

    )
}

export default TableRow;
