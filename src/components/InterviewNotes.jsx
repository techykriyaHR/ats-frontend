import React from "react";
import { FiSend } from "react-icons/fi";
import MessageBox from "./MessageBox"; // Adjust path if needed
import moment from "moment";

const InterviewNotes = ({ interview }) => {
    return (
        <div className="border border-gray-light rounded-lg bg-white">
            {/* Box Label */}
            <div className="flex border-b border-gray-light text-gray-dark">
                <div className="flex-1 p-3 pl-5 border-r border-gray-light">
                    <p className=" display">Interview Notes And Feedback</p>
                    <p className="text-gray-400 body-regular">{interview}</p>
                </div>
                <div className="flex-1 py-3 px-5 space-y-2">
                    <div className="flex items-center">
                        <p className="text-gray-dark body-regular">Interviewer</p>
                        <select name="" className="border border-gray-light body-regular rounded-sm ml-2 p-1">
                            <option value="3">Interviewer 1</option>
                            <option value="3">Interviewer 2</option>
                            <option value="3">Interviewer 3</option>
                        </select>
                    </div>
                    <div className="flex items-center">
                        <p className="text-gray-dark body-regular">Date</p>
                        <input type="date" className="border border-gray-light body-regular rounded-sm ml-2 p-1" />
                    </div>
                </div>
            </div>

            <div className="px-6 pb-5">

                {/* Messages */}
                <div className="max-h-100 overflow-y-auto rounded-lg py-2 px-4">
                    <MessageBox sender="John Virgil Carvajal" date={moment('2025-03-12 13:00:00').format("LLL")} message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam enim ipsa totam impedit maiores! Perspiciatis autem quo expedita voluptatibus magnam laboriosam rem illo error repellat, exercitationem quod provident aperiam eum nemo adipisci explicabo obcaecati deserunt quasi sapiente ab libero. Et aperiam laboriosam id accusantium cum vero cumque! Ex quo, dolores earum placeat ipsum deserunt unde rerum ut velit nobis saepe officia voluptatum ipsam excepturi distinctio accusamus. Quisquam fuga veritatis beatae aspernatur saepe ad soluta numquam illo ut delectus! Natus tenetur modi quod, harum cupiditate doloribus suscipit ipsum, qui eos aperiam repudiandae nobis quas molestias reprehenderit similique vero est esse ipsam." />
                    <MessageBox sender="John Virgil Carvajal" date={moment('2025-03-12 13:00:00').format("LLL")} message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam enim ipsa totam impedit maiores! Perspiciatis autem quo expedita voluptatibus magnam laboriosam rem illo error repellat, exercitationem quod provident aperiam eum nemo adipisci explicabo obcaecati deserunt quasi sapiente ab libero. Et aperiam laboriosam id accusantium cum vero cumque! Ex quo, dolores earum placeat ipsum deserunt unde rerum ut velit nobis saepe officia voluptatum ipsam excepturi distinctio accusamus. Quisquam fuga veritatis beatae aspernatur saepe ad soluta numquam illo ut delectus! Natus tenetur modi quod, harum cupiditate doloribus suscipit ipsum, qui eos aperiam repudiandae nobis quas molestias reprehenderit similique vero est esse ipsam." />
                </div>


                {/* Message input */}
                <div className=" flex items-center gap-2">
                    <textarea rows="1 " class="w-full p-2.5 body-regular text-gray-dark bg-white rounded-lg border border-gray-light focus:ring-blue-500 focus:border-blue-500" placeholder="Type your message..."></textarea>
                    <button className="flex p-2 items-center justify-center rounded-full border border-gray-light bg-white hover:bg-teal-soft cursor-pointer">
                        <FiSend className="h-4 w-4 text-teal" />
                    </button>
                </div>

            </div>
        </div>
    );
};

export default InterviewNotes;
