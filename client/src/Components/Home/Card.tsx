export default function Card({children}){
    return(
        <div className="bg-white shadow-md shadow-black rounded-xl p-4 mb-5">
            {children}
        </div>
    );
}