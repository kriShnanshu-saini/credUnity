import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const LabelInputGroup = ({ children }) => <div className='flex flex-col gap-2'>{children}</div>;

// TODO: Add zod schema validation and render error messages
const Register = () => {
	return (
		<div className='w-full h-full grid place-items-center mt-20'>
			<Card>
				<CardHeader>
					<CardTitle>Create an account</CardTitle>
					<CardDescription>Enter your email below to create an account</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className='grid w-full items-center gap-4'>
							<LabelInputGroup>
								<Label htmlFor='name'>Name</Label>
                                <Input id="name" placeholder="John Doe"/>
                            </LabelInputGroup>
							<LabelInputGroup>
                                <div className='flex w-full items-center justify-between'>
                                    <Label htmlFor='email'>Email address</Label>
                                    <Link to='verify'><small>Verify</small></Link>
                                </div>
                                <Input id="email" placeholder="john.doe@credunity.io" />
                            </LabelInputGroup>
                            <LabelInputGroup>
                                <Label htmlFor='password'>Password</Label>
                                <Input id="password" type="password" placeholder="Password" />
                            </LabelInputGroup>
                            <Button type="submit" className="w-full ">Create account</Button>
						</div>
                    </form>
                </CardContent>
                <CardFooter>
                    <small className='text-center w-full'>
                        Already have an account?
                        <Link to="/auth/login" className='text-black/80 font-medium'>Login</Link>
                    </small>
                </CardFooter>
			</Card>
		</div>
	);
};

export default Register;
