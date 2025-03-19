
export default function MessageBox({ message, sender, date }) {
    return (


        <div className="my-4 border border-gray-light rounded-lg p-6">

            <div className="mb-3 flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                    <img
                        src="https://i.pinimg.com/originals/ee/5a/b2/ee5ab2fdab2c09e8995e0e5225a61d8f.gif"
                        alt="Marvin Bautista"
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="flex-col">
                    <h3 className="headline text-gray-dark">{sender}</h3>
                    <p className="body-tiny text-gray-400">{date}</p>
                </div>
            </div>
            <div className="space-y-4 text-gray-dark body-regular">
                <p>{message}</p>
            </div>
        </div>

    );
}