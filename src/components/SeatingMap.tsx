import { Seat } from '@/components/Seat.tsx';


function SeatingMap() {
    return(
        <div className="bg-white rounded-md grow grid p-3 self-stretch shadow-sm" style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))',
            gridAutoRows: '40px'
        }}>
            {/*	seating map */}
            {
                Array.from({ length: 100 }, (_, i) => (
                    <Seat key={i} />
                ))
            }
        </div>
    )
}

export default SeatingMap;