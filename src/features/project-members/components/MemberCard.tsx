const MemberCard = ({
  image,
  name,
  role,
}: {
  image: string;
  name: string;
  role: string;
}) => {
    const handleRemove = () => {
        console.log('Remove member');
    }
  return (
    <div className='member-card'>
      <div className='member-info'>
        <img src={image} alt='image' />
        <h1 className='member-name'>{name}</h1>
      </div>
      <div className='member-actions'>
        <div className="select-overlay">
        <select name='role' id='role' defaultValue={role.toLowerCase()}>
          <option value='maintainer'>Maintainer</option>
          <option value='manager'>Manager</option>
          <option value='member'>Member</option>
        </select>
        </div>
        <button className='member-remove-btn' onClick={handleRemove}>Remove</button>
      </div>
    </div>
  );
};

export default MemberCard;
